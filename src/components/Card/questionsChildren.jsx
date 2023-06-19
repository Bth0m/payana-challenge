import Rating from "../rating";

const QuestionsChildren = ({
  currentQuestion,
  handleResponse,
  handleNextQuestion,
}) => {
  const { text, rate, id, response } = currentQuestion;
  return (
    <>
      <h2 className="card-title text-black text-center">{text}</h2>
      <Rating
        rate={rate}
        currentRate={response}
        userId={id}
        handleResponse={handleResponse}
      />
      <div className="card-actions justify-end">
        <button onClick={handleNextQuestion} className="btn btn-primary">
          siguiente
        </button>
      </div>
    </>
  );
};
export default QuestionsChildren;
