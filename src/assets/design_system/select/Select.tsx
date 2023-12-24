import { useState, useRef, useEffect, useCallback } from "react";
import { getAllPokemonInfo } from "../../../service/api";

import validationForm from "../../../utils/validateForm";

import Badge from "../badge/Badge";

import {
  TOtherSprites,
  TPokemon,
  TSimplePokemonData,
} from "../../../type/type";

import pokemonIcon from "../../../images/icons/pokemon-icon.webp";

const Select = ({
  label,
  data,
  select,
  setSelect
}: {
  label?: string;
  data: { name: string; url: string }[];
  select: TPokemon[];
  setSelect: React.Dispatch<React.SetStateAction<TPokemon[]>>
}) => {
  const [openList, setOpenList] = useState(false);
  const [writeLine, setWriteLine] = useState("");
  const [offset, setOffset] = useState(8);
  
  const [parentStyle, setParentStyle] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [showListArrow, setShowListArrow] = useState(true);

  const [filterData, setFilterData] = useState<TSimplePokemonData[]>(data);

  const [allPokemon, setAllPokemon] = useState<TPokemon[]>([]);

  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (offset > 8) {
      getPokemonData();
    }
  }, [offset]);

  useEffect(() => {
    if (select.length >= 4) {
      setOpenList(false)
      setShowListArrow(false);
    } else {
      setOpenList(true)
      setShowListArrow(true);
    }
  }, [select]);

  useEffect(() => {
    if (writeLine.length > 0) {
      setOpenList(true);
      setFilterData((state) =>
        data.filter((item) => item.name.includes(writeLine))
      );

      setOffset(8);

      setAllPokemon([]);
      getPokemonData();
    } else if (writeLine.length === 0) {
      setFilterData((state) => data);

      setOffset(8);

      setAllPokemon([]);
      getPokemonData();
    }
  }, [writeLine]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 1;
      if (isAtBottom && offset < allPokemon.length) {
        setOffset((state) => state + 9);
      }
    }
  };

  const handleChildClick = () => {
    if (childRef.current) {
      childRef.current.focus();
      setParentStyle("border-indigo-700");
    }
  };

  const arrowStyle = () => {
    return openList
      ? "rotate-180 transition-all duration-200"
      : "rotate-0 transition-all duration-200";
  };

  const renderBadge = (data: TPokemon[]) => {
    return data.map((item, i) => {
      return (
        <div className="mr-1 " key={i}>
          <Badge
            title={item.name}
            cross={true}
            deleteBadge={() =>
              setSelect((state) =>
                state.filter((pokemon) => pokemon.name !== item.name)
              )
            }
          />
        </div>
      );
    });
  };

  const getPokemonData = async () => {
    filterData.map(async (item, i) => {
      const { name, url } = item;
      if (offset - 8 <= i && offset >= i) {
        try {
          const pokemon = await getAllPokemonInfo(url);
          pokemon ? setAllPokemon((state) => [...state, pokemon.data]) : null;
        } catch (e) {}
      }
    });
  };

  const renderListItem = () => {
    return allPokemon.map((item) => {
      const { name, id, sprites } = item
      const image =
        sprites.other?.["official-artwork"].front_default === null
          ? pokemonIcon
          : sprites.other?.["official-artwork"].front_default;
      const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);

      return (
        <div
          key={id}
          className="w-full py-1 h-7 flex items-center cursor-pointer border-y border-solid border-slate-400  hover:bg-slate-300 transition-all hover:transition-all "
          onClick={() => {
            setWriteLine("");

            if (!select.some(item => item.name === nameUpper)) {
              setSelect(prevState => [...prevState, { name: nameUpper, id, sprites }]);
            }

          }}
        >
          <img src={image} alt={name} className="w-6 h-6 mr-2" />
          <span className="text-xl">{nameUpper}</span>
        </div>
      );
    });
  };

  return (
    <div className="relative">
      <span className="mb-2">{label}</span>
      <div
        onClick={handleChildClick}
        tabIndex={0}
        className={` overflow-hidden flex justify-between relative items-center p-2 box-border border rounded-md border-solid border-slate-300 hover:border-indigo-500  outline-none ${parentStyle}`}
      >
        <div className="flex w-full flex-wrap">
          {renderBadge(select)}
          <input
            className=" flex outline-none pl-1"
            tabIndex={0}
            value={writeLine}
            onBlur={() => {
              // setOpenList(false);
              setParentStyle("");
            }}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              setWriteLine(target.value);
            }}
          />
        </div>

        <div className="flex items-center pl-2">
          <div className="cursor-pointer" onClick={() => setSelect([])}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="15"
              height="15"
              viewBox="0 0 256 256"
              xmlSpace="preserve"
            >
              <defs></defs>
              <g
                style={{
                  stroke: "none",
                  strokeWidth: "0",
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: "10",
                  fill: "none",
                  fillRule: "nonzero",
                  opacity: "1",
                }}
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
              >
                <path
                  d="M 3 90 c -0.768 0 -1.536 -0.293 -2.121 -0.879 c -1.172 -1.171 -1.172 -3.071 0 -4.242 l 84 -84 c 1.172 -1.172 3.07 -1.172 4.242 0 c 1.172 1.171 1.172 3.071 0 4.242 l -84 84 C 4.536 89.707 3.768 90 3 90 z"
                  style={{
                    stroke: "none",
                    strokeWidth: "1",
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: "10",
                    fill: "rgb(0,0,0)",
                    fillRule: "nonzero",
                    opacity: "1",
                  }}
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
                <path
                  d="M 87 90 c -0.768 0 -1.535 -0.293 -2.121 -0.879 l -84 -84 c -1.172 -1.171 -1.172 -3.071 0 -4.242 c 1.171 -1.172 3.071 -1.172 4.242 0 l 84 84 c 1.172 1.171 1.172 3.071 0 4.242 C 88.535 89.707 87.768 90 87 90 z"
                  style={{
                    stroke: "none",
                    strokeWidth: "1",
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: "10",
                    fill: "rgb(0,0,0)",
                    fillRule: "nonzero",
                    opacity: "1",
                  }}
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
          {
            showListArrow ?
              <div
                className={`ml-2 ${arrowStyle()} cursor-pointer`}
                onClick={() => setOpenList(!openList)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  width="15"
                  height="15"
                  viewBox="0 0 256 256"
                  xmlSpace="preserve"
                >
                  <defs></defs>
                  <g
                    style={{
                      stroke: "none",
                      strokeWidth: "0",
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: "10",
                      fill: "none",
                      fillRule: "nonzero",
                      opacity: "1",
                    }}
                    transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                  >
                    <path
                      d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
                      style={{
                        stroke: "none",
                        strokeWidth: "1",
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: "10",
                        fill: "rgb(0,0,0)",
                        fillRule: "nonzero",
                        opacity: "1",
                      }}
                      transform=" matrix(1 0 0 1 0 0) "
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>
              :
              null
          }
        </div>

        {validationForm(writeLine, "select", filterData).errorStatus ? (
          <div
            className={`absolute -bottom-4 left-0 text-xs ${
              validationForm(writeLine, "select", filterData)?.classLabel
            }`}
          >
            {validationForm(writeLine, "select", filterData)?.message}
          </div>
        ) : null}
      </div>

      {openList ? (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="absolute w-full bg-slate-100 max-h-56 overflow-y-scroll"
          // onClick={() => setOpenList(true)}
        >
          {renderListItem()}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
