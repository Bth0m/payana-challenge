import Rating from "../rating";

const CheckResponseChildren = ({ questions, handleSendSurvey }) => (
  <>
    <h2 className="card-title text-black text-center">Tus respuestas</h2>
    {questions.map((item) => (
      <div>
        <h1>{item.text} </h1>
        <Rating rate={item.rate} currentRate={item.response} disabled />
      </div>
    ))}
    <button onClick={handleSendSurvey} className="btn btn-primary">
      Enviar
    </button>
  </>
);
export default CheckResponseChildren;
