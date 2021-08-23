/*
 * Copyright (c) 2020 iTAC Software AG, Germany. All Rights Reserved.
 *
 * This software is protected by copyright. Under no circumstances may any part of this file in any form be copied,
 * printed, edited or otherwise distributed, be stored in a retrieval system, or be translated into another language
 * without the written permission of iTAC Software AG.
 *
 */

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                                                                                                  Version 1.0

/**
 *
 *
 *
 * @version 		9.20.00
 * @author 			Faouzi Ben Mabrouk
 * @copyright		2021 Innova Power Concept, iTAC Software AG partner
 *
 */

/*
Change index:

 * Name                    Date            Customer        Function                		   Comment
    Faouzi Ben Mabrouk      2021-04-01      IPC             Test           	                Initial version
   
*/

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

importPackage(com.itac.mes.api.custom);
importPackage(com.itac.mes.core.domain.mig.exception);
importPackage(com.itac.mes.imsapi.domain.container);
importPackage(com.itac.mes.imsapi.service);
importPackage(com.itac.util.constants.imsapi);
importPackage(com.itac.util.date);
importPackage(java.lang);
importPackage(java.text);
importPackage(java.util);

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

function _generateReturn(returnValue, errorString, outArgs) {
    var result = new Result_customFunctionCommon();
    result.return_value = returnValue;
    result.errorString = errorString;
    result.outArgs = outArgs ? (Array.isArray(outArgs) ? outArgs : [outArgs]) : [];
    return result;
}

function _getErrorText(errorCode) {
    var result_imsapigetErrorText = imsApiService.imsapiGetErrorText(imsApiSessionContext, errorCode);
    if (result_imsapigetErrorText.return_value === ItacMesErrorCodeIMSApi.COMMON_SERVER_ERROR.getReturnValue()) {
        return ItacMesErrorCodeIMSApi.COMMON_SERVER_ERROR.getErrorString();
    }
    return String(result_imsapigetErrorText.errorString);
}

function _generateError(errorCode, methodName) {
    var errorText = _getErrorText(errorCode);
    var errorString = "Fehler in MES API " + methodName + " : " + errorCode + " '" + errorText + "'";

    // eslint-disable-next-line no-magic-numbers
    return _generateReturn(-1002, errorString, []);
}

function _getImsApiErrorText(retCode) {
    var errorText = "";
    var result;
    try {
        result = imsApiService.imsapiGetErrorText(imsApiSessionContext, retCode);
    } catch (th) {
        result.outArgs = logHandler.getMessages();
        result.return_value = ItacMesErrorCodeApi.SERVER_ERROR.getReturnValue();
        result.errorString = ItacMesErrorCodeApi.SERVER_ERROR.getErrorString();
        return result;
    }
    if (result != null) {
        errorText = "" + result.errorString;
    }
    return errorText;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------
//  ██████╗██╗   ██╗███████╗████████╗ ██████╗ ███╗   ███╗    ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║██╔════╝╚══██╔══╝██╔═══██╗████╗ ████║    ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// ██║     ██║   ██║███████╗   ██║   ██║   ██║██╔████╔██║    █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██║     ██║   ██║╚════██║   ██║   ██║   ██║██║╚██╔╝██║    ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ╚██████╗╚██████╔╝███████║   ██║   ╚██████╔╝██║ ╚═╝ ██║    ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
//  ╚═════╝ ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
// ------------------------------------------------------------------------------------------------------------------------------------------------------------

function Test_GEN() {

    return _generateReturn(0, "Successful", ["out1", "out2"]);
}
