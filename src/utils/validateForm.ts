// import { TValidatinForm } from "../types/types";

import { TSimplePokemonData } from "../type/type";

export type TValidatinForm = {
  errorStatus: boolean;
  message: string;
  classInput: string;
  classLabel: string;
};

const validationForm = (value: string, name: string, arr?: TSimplePokemonData[]): TValidatinForm => {

    if (name === 'name' || name === 'surname') {
      if (value.length === 0) {
        
        return {
          errorStatus: true,
          message: '',
          classInput: '',
          classLabel: '',
        }

      } else if (value.match(/^[a-zA-Z]+$/) === null && value.length !== 0) {
        
        return {
          errorStatus: true,
          message: 'Write only A-Za-z',
          classInput: 'border-red-600',
          classLabel: 'text-red-600',
        }

      } else if (value.length < 2 && value.length !== 0) {
        return {
          errorStatus: true,
          message: 'Write biger 2 symbols',
          classInput: 'border-red-600',
          classLabel: 'text-red-600',
        }
      } else if (value.length > 12) {
        return {
          errorStatus: true,
          message: 'Write max 12 symbols',
          classInput: 'border-red-600',
          classLabel: 'text-red-600',
        }
      } 
      else {
        return {
          errorStatus: false,
          message: '',
          classInput: 'border-slate-300',
          classLabel: '',
        }
      }
    }else if (name === 'select') {
      if (value.match(/^[a-zA-Z]+$/) === null && value.length !== 0) {
        
        return {
          errorStatus: true,
          message: 'Write only A-Za-z',
          classInput: 'border-red-600',
          classLabel: 'text-red-600',
        }

      } else if (arr && arr.length === 0) {
        return {
          errorStatus: true,
          message: 'This pokemon not found',
          classInput: 'border-red-600',
          classLabel: 'text-red-600',
        }
      } else {
        return {
          errorStatus: false,
          message: '',
          classInput: 'border-slate-300',
          classLabel: '',
        }
      }
      
      
    } else {
      return {
        errorStatus: false,
        message: '',
        classInput: 'border-slate-300',
        classLabel: '',
      }
    }

    
  
}

export default validationForm;