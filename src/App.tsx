import './App.css';
import React, { useEffect, useState } from "react";

interface IParam {
  id: number;
  name: string;
  type?: "string";
}

interface IParamValue {
  paramId: number;
  value: string;
}

interface IModel {
  paramValues: IParamValue[];
}

interface IProps {
  params: IParam[];
  model: IModel;
}


const ParamEditor: React.FC<IProps> = ({params, model}) => {
  const [paramValues, setParamValues] = useState<IParamValue[]>(model.paramValues);
  
  useEffect(()=>{
    const updatedParamValues = params.map(
      el => paramValues.find(pv => pv.paramId === el.id) || {paramId: el.id, value: ''}
    )
    setParamValues(updatedParamValues);
  }, [params])

  const handleInputChange = (paramId: number, value: string) => {
    const updatedParamValues = paramValues.find(
      el => el.paramId === paramId) 
      ? paramValues.map(pv => {
          if (pv.paramId === paramId) {
            return { ...pv, value };
          }
          return pv;
        }) 
      : [...paramValues, {paramId: paramId, value: value}]
    setParamValues(updatedParamValues);
  };

  const getModel = (): IModel => {
    return { paramValues };
  };

  
  return (
    <div>
      {params.map( (param) => {
        return (
          <div key={param.id}>
            <label>{param.name}: </label>
            <input
              type="text"
              value={paramValues.find((pv) => pv.paramId === param.id)?.value || ''}
              onChange={(e) => handleInputChange(param.id, e.target.value)}
            />
          </div>
        )
      })}
      <button onClick={()=>console.log(getModel())
  }>getModel в консоль</button>

    </div>
  )

}

function App() {
  const PARAMS = [
    {
      "id": 1,
      "name": "Назначение"
    },
    {
      "id": 2,
      "name": "Длина"
    },
    {
      "id": 3,
      "name": "Ширина"
    }
  ]
  
  const MODEL = {
    "paramValues": [
        {
          "paramId": 1,
          "value": "повседневное"
        },
        {
          "paramId": 2,
          "value": "макси"
        }
    ]
  }

  return (
    <div className="App">
      <ParamEditor params={PARAMS} model={MODEL}/>
    </div>
  );
}

export default App;
