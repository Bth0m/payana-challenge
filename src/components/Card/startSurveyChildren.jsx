const StartSurveyChildren = ({ handleStartSurvey }) => (
  <>
    <h2 className="card-title text-black text-center">
      Hola, gracias por ayudarnos a mejorar!
    </h2>
    <button onClick={handleStartSurvey} className="btn btn-primary">
      Empezar
    </button>
  </>
);
export default StartSurveyChildren;
