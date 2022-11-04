package com.gooddriver.database;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {LocationEntity.class, AccelerometerEntity.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {

    public abstract LocationDao locationDao();


}
