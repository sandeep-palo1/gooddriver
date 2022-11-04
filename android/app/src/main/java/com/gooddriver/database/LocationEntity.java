package com.gooddriver.database;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class LocationEntity {
    @PrimaryKey(autoGenerate = true)
    public int location_id;

    @ColumnInfo(name = "timestamp")
    public String timestamp;

    @ColumnInfo(name = "trip_id")
    public String tripId;

    @ColumnInfo(name = "latitude")
    public double latitude;

    @ColumnInfo(name = "longitude")
    public double longitude;

    @ColumnInfo(name = "altitude")
    public double altitude;

    @ColumnInfo(name = "accuracy")
    public double accuracy;

    @ColumnInfo(name = "speed")
    public double speed;
}
