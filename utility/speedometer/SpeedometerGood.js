import React, { Component } from 'react';
import {
  View,
  Image,
  Animated,
  Easing,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

// Utils
import calculateDegreeFromLabels from './utils/calculate-degree-from-labels';
import calculateLabelFromValue from './utils/calculate-label-from-value';
import limitValue from './utils/limit-value';
import validateSize from './utils/validate-size';

// Style
import style, { width as deviceWidth } from '../speedometer/styles';
import GoodColors from '../GoodColors';

// eslint-disable-next-line react/prefer-stateless-function
class SpeedometerGood extends Component {
  constructor(props) {
    super(props);
    this.speedometerValue = new Animated.Value(props.defaultValue);
  }

  render() {
    const {
      value,
      size,
      minValue,
      maxValue,
      easeDuration,
      allowedDecimals,
      labels,
      needleImage,
      wrapperStyle,
      outerCircleStyle,
      halfCircleStyle,
      imageWrapperStyle,
      imageStyle,
      innerCircleStyle,
      labelWrapperStyle,
      labelStyle,
      labelNoteStyle,
      useNativeDriver,
    } = this.props;
    const degree = 180;
    const perLevelDegree = calculateDegreeFromLabels(degree, labels);
    const label = calculateLabelFromValue(
      limitValue(value, minValue, maxValue, allowedDecimals), labels, minValue, maxValue,
    );
    Animated.timing(
      this.speedometerValue,
      {
        toValue: limitValue(value, minValue, maxValue, allowedDecimals),
        duration: easeDuration,
        easing: Easing.linear,
        useNativeDriver,
      },
    ).start();

    const rotate = this.speedometerValue.interpolate({
      inputRange: [minValue, maxValue],
      outputRange: ['-90deg', '90deg'],
    });

    const currentSize = validateSize(size, deviceWidth - 20);
    return (
      <View style={[style.wrapper, {
        width: currentSize,
        height: currentSize / 2,
      }, wrapperStyle]}
      >
        <View style={[style.outerCircle, {
          width: currentSize,
          height: currentSize / 2,
          borderTopLeftRadius: currentSize / 2,
          borderTopRightRadius: currentSize / 2,
        }, outerCircleStyle]}
        >
          {labels.map((level, index) => {
            const circleDegree = 90 + (index * perLevelDegree);
            return (
              <View
                key={level.name}
                style={[style.halfCircle, {
                  backgroundColor: level.activeBarColor,
                  width: currentSize / 2,
                  height: currentSize,
                  borderRadius: currentSize / 2,
                  transform: [
                    { translateX: currentSize / 4 },
                    { rotate: `${circleDegree}deg` },
                    { translateX: (currentSize / 4 * -1) },
                  ],
                }, halfCircleStyle]}
              />
            );
          })}
          <Animated.View style={[style.imageWrapper,
            {
              top: -(currentSize / 15),
              transform: [{ rotate }],
            },
            imageWrapperStyle]}
          >
            <Image
              style={[style.image,
                {
                  width: currentSize,
                  height: currentSize,
                }, imageStyle]}
              source={needleImage}
            />
          </Animated.View>
          <View style={[style.innerCircle, {
            width: currentSize * 0.6,
            height: (currentSize / 2) * 0.6,
            borderTopLeftRadius: currentSize / 2,
            borderTopRightRadius: currentSize / 2,
          }, innerCircleStyle]}
          />
        </View>
        <View style={[style.labelWrapper, labelWrapperStyle]}>
          <Text style={
            [style.label, labelStyle]}
          >
            {limitValue(value, minValue, maxValue, allowedDecimals)}
          </Text>
          <Text style={
            [style.labelNote, { color: label.labelColor }, labelNoteStyle]}
          >
            {label.name}
          </Text>
        </View>
      </View>
    );
  }
}

SpeedometerGood.defaultProps = {
  defaultValue: 50,
  minValue: 0,
  maxValue: 100,
  easeDuration: 500,
  allowedDecimals: 0,
  labels: [
    {
      name: 'Bad Score',
      labelColor: GoodColors.accelerateText,
      activeBarColor: GoodColors.col_20,
    },
    
    {
      name: 'Average Score',
      labelColor: GoodColors.accelerateText,
      activeBarColor: GoodColors.col_40,
    },
   
    {
      name: 'Good Score',
      labelColor: GoodColors.accelerateText,
      activeBarColor: GoodColors.col_50,
    },
   
  ],
  needleImage: require('../../resources/images/speedometer_needle.png'),
  wrapperStyle: {},
  outerCircleStyle: {},
  halfCircleStyle: {},
  imageWrapperStyle: {},
  imageStyle: {},
  innerCircleStyle: {},
  labelWrapperStyle: {},
  labelStyle: {},
  labelNoteStyle: {},
  useNativeDriver: true,
};

SpeedometerGood.propTypes = {
  value: PropTypes.number.isRequired,
  defaultValue: PropTypes.number,
  size: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  easeDuration: PropTypes.number,
  allowedDecimals: PropTypes.number,
  labels: PropTypes.array,
  needleImage: PropTypes.any,
  wrapperStyle: PropTypes.object,
  outerCircleStyle: PropTypes.object,
  halfCircleStyle: PropTypes.object,
  imageWrapperStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  innerCircleStyle: PropTypes.object,
  labelWrapperStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  labelNoteStyle: PropTypes.object,
  useNativeDriver: PropTypes.bool,
};

export default SpeedometerGood;