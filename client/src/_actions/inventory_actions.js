import axios from 'axios';
import { ADD_AQUISITION, ADD_IMAGES_VIDEOS, ADD_MEASUREMENTS, ADD_NEW_GEM, ADD_POSITION, ADD_PURCHASE, ADD_PURCHASE_PAYMENT, ADD_SALE, ADD_SALE_PAYMENT, ADD_TREATMENT, ALL_BATCHES, ALL_GEMS, CURRENT_SELECTED_GEM, SETTINGS, SET_CURRENT_BATCH, SHARE_PROFIT, UPDATE_GEM } from './types';
import { INVENTORY_SERVER, SETTINGS_SERVER } from '../components/Config';

export function addNewGem(dataToSubmit) {
    const request = axios.post(`${INVENTORY_SERVER}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_NEW_GEM,
        payload: request
    }
}

export function addMediaFiles(stone_id, dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}/${stone_id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_GEM,
        payload: request
    }
}

export function changeStatus(stone_id, dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}/${stone_id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_GEM,
        payload: request
    }
}

export function addMeasurements(dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_MEASUREMENTS,
        payload: request
    }
}

export function addAquisition(dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_AQUISITION,
        payload: request
    }
}

export function addPurchase(dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_PURCHASE,
        payload: request
    }
}

export function addPurchasePayment(dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_PURCHASE_PAYMENT,
        payload: request
    }
}

export function addTreatment(dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_TREATMENT,
        payload: request
    }
}

export function addPosition(dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_POSITION,
        payload: request
    }
}

export function addSale(dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_SALE,
        payload: request
    }
}

export function addSalePayment(dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_SALE_PAYMENT,
        payload: request
    }
}

export function addProfitShare(dataToSubmit) {
    const request = axios.patch(`${INVENTORY_SERVER}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: SHARE_PROFIT,
        payload: request
    }
}

export function getAllGems() {
    const request = axios.get(`${INVENTORY_SERVER}`)
        .then(response => response.data);

    return {
        type: ALL_GEMS,
        payload: request
    }
}

export function selectedGem(dataToSubmit, groupId) {
    return {
        type: CURRENT_SELECTED_GEM,
        payload: {
            data: dataToSubmit,
            group: groupId
        }
    }
}

export function getAllBatches() {
    const request = axios.get(`${INVENTORY_SERVER}`)
        .then(response => response.data);
        
    return {
        type: ALL_BATCHES,
        payload: request
    }
}

export function importSettings() {
    const request = axios.get(`${SETTINGS_SERVER}`)
        .then(response => response.data);

    return {
        type: SETTINGS,
        payload: request
    }
}

export function setCurrentBatch(dataTosubmit) {
    return {
        type: SET_CURRENT_BATCH,
        payload: dataTosubmit
    }
}




