export default function AuthContainer({ children }) {
  return (
    <section className="mx-auto h-full w-full px-4 md:w-[520px] md:px-0">
      <div className="flex h-full flex-col items-center justify-center md:h-screen">
        {children}
      </div>
    </section>
  );
}
