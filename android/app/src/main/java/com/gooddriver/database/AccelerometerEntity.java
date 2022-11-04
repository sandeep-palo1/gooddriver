package com.gooddriver.database;

import androidx.room.ColumnInfo;
import androidx.room.Dao;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class AccelerometerEntity {

    @PrimaryKey(autoGenerate = true)
    public int accelerate_id;


    @ColumnInfo(name = "timestamp")
    public String timestamp;


    @ColumnInfo(name = "tripId")
    public String tripId;

    @ColumnInfo(name = "x_accelerate")
    public float x_accelerate;

    @ColumnInfo(name = "y_accelerate")
    public float y_accelerate;

    @ColumnInfo(name = "z_accelerate")
    public float z_accelerate;

}
