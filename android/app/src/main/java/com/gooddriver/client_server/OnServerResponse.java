package com.gooddriver.client_server;

import org.json.JSONObject;

public interface OnServerResponse {

    void onSuccess(String s); //JSONObject jsonObject
    void onError(String errorMessage);
}
