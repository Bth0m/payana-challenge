import StartSurveyChildren from "./startSurveyChildren";
import QuestionsChildren from "./questionsChildren";
import CheckResponseChildren from "./checkResponseChildren";

import { CHILDREN_STEPS } from "../../helpers/constants";

const Card = ({
  currentQuestion,
  currentChildren,
  questions,
  handleStartSurvey,
  handleNextQuestion,
  handleResponse,
  handleSendSurvey,
}) => {
  const { INIT, QUESTIONS, RESUME, END } = CHILDREN_STEPS;
  const CurrentComponent = {
    [INIT]: <StartSurveyChildren handleStartSurvey={handleStartSurvey} />,
    [QUESTIONS]: (
      <QuestionsChildren
        currentQuestion={currentQuestion}
        handleResponse={handleResponse}
        handleNextQuestion={handleNextQuestion}
      />
    ),
    [RESUME]: (
      <CheckResponseChildren
        questions={questions}
        handleSendSurvey={handleSendSurvey}
      />
    ),
    [END]: (
      <h2 className="card-title text-black text-center">
        ¡Gracias por ayudarnos a mejorar!
      </h2>
    ),
  };
  return (
    <div className="card card-compact w-96 bg-amber-50 shadow-xl">
      <div className="card-body items-center">
        {CurrentComponent[currentChildren]}
      </div>
    </div>
  );
};

export default Card;
