package com.gooddriver.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class LocationModel implements Serializable {
    @SerializedName("accuracy")
    @Expose
    public Double accuracy;
    @SerializedName("altitude")
    @Expose
    public Double altitude;
    @SerializedName("latitude")
    @Expose
    public Double latitude;
    @SerializedName("location_id")
    @Expose
    public Integer locationId;
    @SerializedName("longitude")
    @Expose
    public Double longitude;
    @SerializedName("speed")
    @Expose
    public Double speed;
    @SerializedName("timestamp")
    @Expose
    public String timestamp;
    @SerializedName("tripId")
    @Expose
    public String tripId;


}
