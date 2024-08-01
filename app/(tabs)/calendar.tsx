import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
  const [selected, setSelected] = useState('');
  const [location, setLocation] = useState('위치 정보를 가져오는 중...');
  const [address, setAddress] = useState('주소를 가져오는 중...');

  const highlightColor = '#E5F2FE';
  const defaultColor = '#ddd'; 

  const getBackgroundColor = (item) => {
    const isHighlightedDate = selected === '2024-08-02';
    return item.location === '서울 중구 을지로 7가 144' && isHighlightedDate
      ? highlightColor
      : defaultColor;
  };

  const dummyData = {
    '2024-08-02': [
      { time: '09:00', location: '서울 동작구 여의대방로 121' },
      { time: '10:00', location: '서울 동작구 여의대방로 121' },
      { time: '11:00', location: '서울 동작구 여의대방로 121' },
      { time: '12:00', location: '서울 중구 을지로 7가 144' },
      { time: '13:00', location: '서울 중구 을지로 7가 144' },
      { time: '14:00', location: '서울 중구 을지로 7가 144' },
      { time: '15:00', location: '서울 중구 을지로 7가 144' },
      { time: '16:00', location: '서울 중구 을지로 7가 144' },
      { time: '17:00', location: '서울 중구 을지로 7가 144' },
      { time: '18:00', location: '서울 중구 을지로 7가 144' },
    ],
    'default': [
      { time: '09:00', location: '해당하는 정보가 없습니다.' },
      { time: '10:00', location: '해당하는 정보가 없습니다.' },
      { time: '11:00', location: '해당하는 정보가 없습니다.' },
      { time: '12:00', location: '해당하는 정보가 없습니다.' },
      { time: '13:00', location: '해당하는 정보가 없습니다.' },
      { time: '14:00', location: '해당하는 정보가 없습니다.' },
      { time: '15:00', location: '해당하는 정보가 없습니다.' },
      { time: '16:00', location: '해당하는 정보가 없습니다.' },
      { time: '17:00', location: '해당하는 정보가 없습니다.' },
      { time: '18:00', location: '해당하는 정보가 없습니다.' },
    ],
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('위치 권한이 필요합니다.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(`위도: ${location.coords.latitude.toFixed(4)}, 경도: ${location.coords.longitude.toFixed(4)}`);
      
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        setAddress(`${address.street} ${address.name}, ${address.country}`);
      } else {
        setAddress('주소를 찾을 수 없습니다.');
      }
    })();
  }, []);

  // Filter data based on the selected date
  const filteredData = dummyData[selected] || dummyData['default'];

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Calendar
        style={styles.calendar}
        theme={{
          todayTextColor: '#00adf5',
        }}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#10BCE2',
          },
        }}
      />
      <View style={styles.dateContainer}>
        <Text style={styles.selectedDateText}>선택날짜: {selected || '없음'}</Text>
        <Text style={styles.selectedDateText}>현재 주소: {address}</Text>
      </View>
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.itemContainer,
              {
                backgroundColor: getBackgroundColor(item),
              },
            ]}
          >
            <Text style={styles.timeText}>{item.time}</Text>
      
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>해당하는 정보가 없습니다.</Text>
      )}
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  calendar: {
    width: width - 20,
    height: 350,
    borderRadius: 20,
  },
  dateContainer: {
    padding: 10,
    marginTop: 20,
    flexDirection: 'column',
    gap: 4,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    borderColor: '#ddd',
  },
  timeText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    width: 60,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    width: 10, // Space between time and address
    marginHorizontal: 20,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'left', // Align text to the left
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
