package com.gooddriver.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class AccelerateModel  implements Serializable {
    @SerializedName("accelerate_id")
    @Expose
    public Integer accelerateId;

    @SerializedName("timestamp")
    @Expose
    public String timestamp;

    @SerializedName("tripId")
    @Expose
    public String tripId;

    @SerializedName("x_accelerate")
    @Expose
    public Double xAccelerate;

    @SerializedName("y_accelerate")
    @Expose
    public Double yAccelerate;

    @SerializedName("z_accelerate")
    @Expose
    public Double zAccelerate;
}
