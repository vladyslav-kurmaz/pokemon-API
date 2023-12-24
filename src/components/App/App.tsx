import { useEffect, useState } from "react";
import { getData } from "../../service/api";

import Button from "../../assets/design_system/button/Button";
import Input from "../../assets/design_system/input/Input";
import Select from "../../assets/design_system/select/Select";
import Modal from "../../assets/design_system/modal/Modal";

import humanIcon from "../../images/icons/user-icon.png";
import { TPokemon, TSimplePokemonData } from "../../type/type";

import logo from "../../images/logo/pokemon-logo.webp";
import pokemonIcon from "../../images/icons/pokemon-icon.webp";

function App() {
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");

  const [nameStatus, setNameStatus] = useState(false);
  const [surNameStatus, setSurNameStatus] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [pokemonData, setPokemonData] = useState<TSimplePokemonData[]>([]);
  const [listData, setListData] = useState<TPokemon[]>([]);

  const [step, setStap] = useState(0);

  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: (value: React.SetStateAction<string>) => void
  ) => {
    const value = e.target.value.trim();
    setState((state) => value);
    // eslint-disable-next-line
  };

  useEffect(() => {
    if (nameStatus && surNameStatus) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, surName]);

  useEffect(() => {
    getData(setPokemonData);
  }, []);

  const stepRender = () => {
    switch (step) {
      case 0:
        return (
          <>
            <p>Here you can choose pokemon for fight in the Battle Tower</p>
            <Button text="Next" handle={() => setStap(step + 1)} />
          </>
        );
      case 1:
        return (
          <Modal
            title="Enter your name"
            buttonsText={["Cancel", "Next"]}
            disabled={buttonDisabled}
            handleNext={() => setStap(step + 1)}
            handlePrew={() => setStap(step - 1)}
          >
            <Input
              value={name}
              handler={(e) => changeValue(e, setName)}
              label="Name"
              id="form-name"
              statusValidate={setNameStatus}
              name="name"
              icon={humanIcon}
            />
            <Input
              value={surName}
              handler={(e) => changeValue(e, setSurName)}
              label="Last name"
              id="form-last-name"
              statusValidate={setSurNameStatus}
              name="surname"
              icon={humanIcon}
            />

          </Modal>
        );
      case 2:
        return (
          <Modal
            title={`${name}, choose 4 pokemon`}
            buttonsText={["Cancel", "Next"]}
            disabled={buttonDisabled}
            handleNext={() => setStap(step + 1)}
            handlePrew={() => setStap(step - 1)}
          >
            <Select 
              label="Choose pokemon" 
              data={pokemonData} 
              select={listData}
              setSelect={setListData}/>

          </Modal>
        );
      case 3:
        return (
          <div className="flex flex-col items-center flex-wrap">
            <h2>You choese this pokemon</h2>
            <ul className="flex">
              {
                listData.map(item => {
                  const {name, id, sprites} = item;
                  const image =
                    sprites.other?.["official-artwork"].front_default === null
                      ? pokemonIcon
                      : sprites.other?.["official-artwork"].front_default;
                  return (
                    <li className="mx-2 max-w-20 flex flex-col items-center" key={id}>
                      <img src={image} className="max-w-20" alt={name} />
                      <p>{name}</p>
                    </li>
                  )
                })
              }
            </ul>

            <div className="flex max-w-60 w-full justify-between">
              <Button text='Back' handle={() => setStap(step - 1)} type='text'/>
              <Button text='Try again' handle={() => {
                setStap(0);
                setName('');
                setSurName('');
                setListData([])
              }} type="prime"/>
              
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <img src={logo} alt="logo" className="mx-auto w-52 mb-5" />
      <div className="flex justify-center w-full mx-auto">{stepRender()}</div>
    </div>
  );
}

export default App;
