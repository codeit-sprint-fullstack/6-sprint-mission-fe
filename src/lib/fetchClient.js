/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 */
export const defaultFetch = async (url, options = {}) => {
	const baseURL = "/api";
	const defaultOptions = {
		headers: {
			"Content-Type": "application/json",
		},
		// Next.js 기본 캐싱 활성화
		cache: "force-cache",
	};

	const mergedOptions = {
		...defaultOptions,
		...options,
		headers: {
			...defaultOptions.headers,
			...options.headers,
		},
	};

	const response = await fetch(`${baseURL}${url}`, mergedOptions);

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}

	return response.json();
};

/**
 * 쿠키 인증 fetch 클라이언트
 */
export const cookieFetch = async (url, options = {}) => {
	const baseURL = "/api"; // ✅ 프록시 경로 사용
	const defaultOptions = {
		headers: {
			"Content-Type": "application/json",
		},
		// 쿠키 전송을 위한 설정
		credentials: "include",
		// 서버 컴포넌트에서도 매번 재검증
		cache: "no-store",
	};

	const token =
		typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

	const mergedOptions = {
		...defaultOptions,
		...options,
		headers: {
			...defaultOptions.headers,
			...options.headers,
			...(token && { Authorization: `Bearer ${token}` }),
		},
	};

	// 원래 요청 실행
	let response = await fetch(`${baseURL}${url}`, mergedOptions);

	if (response.status === 401 && url !== "/auth/refresh-token") {
		try {
			const refreshToken =
				typeof window !== "undefined"
					? localStorage.getItem("refreshToken")
					: null;

			const refreshResponse = await fetch("/api/auth/refresh-token", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				cache: "no-store",
				body: JSON.stringify({ refreshToken }),
			});

			if (refreshResponse.ok) {
				const tokens = await refreshResponse.json();
				localStorage.setItem("accessToken", tokens.accessToken);
				localStorage.setItem("refreshToken", tokens.refreshToken);

				// 헤더에 갱신된 토큰 넣고 다시 요청
				const retryOptions = {
					...mergedOptions,
					headers: {
						...mergedOptions.headers,
						Authorization: `Bearer ${tokens.accessToken}`,
					},
				};
				response = await fetch(`${baseURL}${url}`, retryOptions);
			}
		} catch (error) {
			console.error("토큰 갱신 실패:", error);
		}
	}

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}

	// 응답 본문이 있는지 확인
	const contentType = response.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
		return response.json();
	}

	// 본문이 없거나 JSON이 아닌 경우 응답 객체 자체 반환
	return { status: response.status, ok: response.ok };
};
