import { useEffect, useState } from "react";

import Card from "./components/Card";

import { CHILDREN_STEPS } from "./helpers/constants";

import "./App.css";

const App = () => {
// - Aca creamos nuestro store, en esta vamos a usar las keys para lo siguiente: 
// Current: esta nos va a indicar en que posicion del array va el usuario.
// Questions: una vez que ya tengamos las preguntas de la db, vamos a cargarlo aqui con el mismo formato.
// CurrentChildren: este nos va a indicar en que seccion de la app esta el usuario, ya que tenemos 4 steps (inicio, preguntas, resumen, fin)
  const [store, setStore] = useState({
    current: 0,
    questions: [],
    currentChildren: CHILDREN_STEPS.INIT,
  });

// - Esta funcion es la que trae las preguntas de la db, se podria mejorar con useQuery o Axios
// si se quisieramos hacer crecer la app.
  const getQuestions = async () => {
    const res = await fetch(
      `https://onxizaqidozhkkkejgib.supabase.co/rest/v1/listquestions?select=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ueGl6YXFpZG96aGtra2VqZ2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcyMDM2MzcsImV4cCI6MjAwMjc3OTYzN30.hD9Bp93OGje4ZTLDqp0bN1YOSfpJ_3gQjO8gYtvGT1g",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ueGl6YXFpZG96aGtra2VqZ2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcyMDM2MzcsImV4cCI6MjAwMjc3OTYzN30.hD9Bp93OGje4ZTLDqp0bN1YOSfpJ_3gQjO8gYtvGT1g",
        },
      }
    );
    const data = await res.json();
    setStore({ ...store, questions: data });
  };


  useEffect(() => {
    getQuestions();
  }, []);
  
  // -Funcion que le damos al componente para que pueda actualizar en que seccion esta el usuario.
  // en este caso el flujo seria de step 1 a 2 
  const handleStartSurvey = () => {
    setStore({ ...store, currentChildren: CHILDREN_STEPS.QUESTIONS });
  };

  // - Localiza la pregunta gracias al parametro questionId, y pone la respuesta del usuario
  // se podria rastrear la pregunta con el current que nos provee el store pero es mas seguro usar el id.
  const handleResponse = (questionId, response) => {
    const currentQuestion = [
      ...store.questions.map((q) =>
        q.id === questionId ? { ...q, response } : q
      ),
    ];
    setStore({ ...store, questions: [...currentQuestion] });
  };

  // - Esta funcion cumple dos roles: 
  // 1. si el usuario no esta en la ultima pregunta, actualiza nuestro current en el store.
  // 2. si el usuario esta en la ultima pregunta, actualiza el flujo de la app y pasa de step 2 a 3
  const handleNextQuestion = () => {
    if (!(store.questions.length - 1 == store.current)) {
      setStore({
        ...store,
        current: store.current + 1,
      });
    } else setStore({ ...store, currentChildren: CHILDREN_STEPS.RESUME });
  };

  // - Muy parecida a la funcion "handleStartSurvey" la diferencia es que cambia el step de 3 a 4
  const handleSendSurvey = () => {
    setStore({ ...store, currentChildren: CHILDREN_STEPS.END });
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card
        currentQuestion={store.questions[store?.current]}
        currentChildren={store.currentChildren}
        questions={!store.currentChildrenIsQuestions ? store.questions : []}
        handleStartSurvey={handleStartSurvey}
        handleNextQuestion={handleNextQuestion}
        handleResponse={handleResponse}
        handleSendSurvey={handleSendSurvey}
      />
    </div>
  );
};

export default App;
