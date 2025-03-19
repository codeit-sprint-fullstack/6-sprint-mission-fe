import style from "./Tags.module.scss";

const Tags = ({ tags, deleteTag }) => {
  return (
    <div className={style.tagsContainer}>
      <section className={style.tags}>
        {tags.map((tag, i) => {
          return (
            <article key={`${i}_${tag}`} className={style.tag}>
              <p>{`#${tag}`}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteTag(tag);
                }}
                className={style.tagCancelBtn}
              >
                <img
                  src="/assets/image/registration/tags/ic_cancel.svg"
                  alt="취소"
                />
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Tags;
