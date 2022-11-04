package com.gooddriver.database;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;

import java.util.List;

@Dao
public interface LocationDao {
    @Query("SELECT * FROM locationentity")
    List<LocationEntity> getAll();


    @Insert
    void insertAll(LocationEntity... entities);

    @Delete
    void delete(LocationEntity locationEntity);

    @Query("SELECT COUNT(*) FROM locationentity")
    int getCount();

    //Accelerometer
    @Query("SELECT * FROM accelerometerentity")
    List<AccelerometerEntity> getAllAccelerate();

    @Insert
    void insertAll(AccelerometerEntity... entities);

    @Delete
    void deleteAccelerometer(AccelerometerEntity entity);

}
