import { fromJS } from 'immutable'

import { constProduct, constSpecial, constTarget, GET_CONFIG_FROM_SERVER, SAVE_CONFIG_SUCCESS, CLEAR_SAVING_STATUS } from './const';
import { v1 } from 'uuid';

export function getData() {
    return function (dispatch) {
        fetch('/api/get').then(function (res) {
            return res.json()
        }).then(function (config) {
            dispatch({
                type: GET_CONFIG_FROM_SERVER,
                home: fromJS(config)
            })
        })
    }
}

export function clearSaveStatus() {
    return { type: CLEAR_SAVING_STATUS }
}

export function saveData() {
    return function (dispatch, getState) {
        let data = getState().get('home').toJS();
        fetch('/api/save', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => {
            return res.json()
        }).then(res => {
            let { status } = res;
            dispatch({
                type: SAVE_CONFIG_SUCCESS, status
            })
        })
    }
}

export const homeProductActions = {
    addProduct: function (port) {
        return {
            type: constProduct.ADD_A_PRODUCT,
            prod: {
                name: '',
                id: v1(),
                port,
                configs: []
            }
        }
    },
    changeConfigName: function (name, prodId, configId) {
        return {
            type: constProduct.CHANGE_PROD_CONFIG_NAME,
            name, prodId, configId
        }
    },
    changeConfigValue: function (reg, prodId, configId) {
        return {
            type: constProduct.CHANGE_PROD_CONFIG_REG,
            reg, prodId, configId
        }
    },

    changeProdName: function (name, prodId) {
        return {
            type: constProduct.CHANGE_PROD_NAME,
            name, prodId
        }
    },

    changeProdPort: function (port, prodId) {
        return {
            type: constProduct.CHANGE_PROD_PORT,
            port, prodId
        }
    },

    addConfigToProd: function (prodId) {
        return {
            type: constProduct.ADD_A_PRODUCT_CONFIG,
            prodId,
            config: {
                reg: '',
                name: '',
                id: v1()
            }
        }
    },

    deleteProduct: function(prodId){
        return {
            type: constProduct.DELETE_A_PRODUCT, prodId
        }
    },

    deleteProductConfig: function(configId, prodId){
        return {
            type: constProduct.DELETE_A_PRODUCT_CONFIG, configId, prodId
        }
    }

}

export const homeSpecialActions = {
    addSpecial: function () {
        return {
            type: constSpecial.ADD_A_SPECIAL, config: {
                port: '',
                name: '',
                id: v1(),
                reg: "",
                referer: ''
            }
        }
    },
    changeSpecialName: function (name, specialId) {
        return { type: constSpecial.CHANGE_SPECIAL_NAME, name, specialId }
    },
    changeSpecialReg: function (reg, specialId) {
        return { type: constSpecial.CHANGE_SPECIAL_REG, reg, specialId }
    },
    changeSpecialPort: function(port, specialId){
        return {type: constSpecial.CHANGE_SPECIAL_PORT, port, specialId}
    },
    changeSpecialReferer: function(referer, specialId){
        return {type: constSpecial.CHANAGE_SPECIAL_REFERER, referer, specialId}
    },
    deleteSpecialConfig: function(specialId){
        return {type: constSpecial.DELETE_A_SPECIAL, specialId}
    }
}

export const homeTargetActions = {
    changeTargetName: function (name) {
        return {
            type: constTarget.CHANGE_TARGET_NAME, name
        }
    },
    changeTargetIP: function (ip) {
        return {
            type: constTarget.CHANAGE_TARGET_IP, ip
        }
    }
}