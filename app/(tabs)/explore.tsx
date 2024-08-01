import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, TextInput, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { SERVER_URL } from '@/shared/constants';

const initialCompanyLocation = {
  latitude: 37.5665256,
  longitude: 127.0092236,
  title: '',
  description: '',
  employerName: '', 
  imageUrl: 'https://via.placeholder.com/100', 
};

export default function ExploreScreen() {
  const [companyLocation, setCompanyLocation] = useState(initialCompanyLocation);
  const [searchWord, setSearchWord] = useState('');
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: initialCompanyLocation.latitude,
    longitude: initialCompanyLocation.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.01,
  });

  const handleSearch = () => {
    if (searchWord) {
      fetch(`${SERVER_URL}/api/company?searchWord=${searchWord}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            const { companyInfo, companyLocation } = data.data;
            setCompanyLocation({
              latitude: companyLocation.latitude,
              longitude: companyLocation.longitude,
              title: companyInfo.companyName,
              description: companyInfo.address,
              employerName: companyInfo.employer,
              imageUrl: companyInfo.image,
            });
            setRegion({
              latitude: companyLocation.latitude,
              longitude: companyLocation.longitude,
              latitudeDelta: 0.02, 
              longitudeDelta: 0.01,
            });
            setIsInfoVisible(true); 
          } else {
            setIsInfoVisible(false); 
          }
        })
        .catch(error => {
          console.error('Error fetching company info:', error);
          setIsInfoVisible(false); 
        });
    } else {
      setIsInfoVisible(false); 
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
      >
        <Marker
          coordinate={{
            latitude: companyLocation.latitude,
            longitude: companyLocation.longitude,
          }}
          title={companyLocation.title}
          description={companyLocation.description}
        />
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="고용장, 고용주 이름을 입력하세요"
          placeholderTextColor="#888"
          value={searchWord}
          onChangeText={setSearchWord}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#888" />
        </TouchableOpacity>
      </View>
      {isInfoVisible && (
        <View style={styles.infoOverlay}>
          <View style={styles.infoContent}>
            <View style={styles.infoDetails}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: companyLocation.imageUrl }} style={styles.companyImage} />
            </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>{companyLocation.title}</Text>
                <Text style={styles.infoDescription}>{companyLocation.description}</Text>
                <Text style={styles.employerName}>{companyLocation.employerName}</Text>
              </View>
            </View>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.button} onPress={() => alert('버튼 클릭됨')}>
              <Text style={styles.buttonText}>선택하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: '5%',
    right: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  searchInput: {
    height: 50,
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 3,
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    zIndex: 2,
  },
  infoOverlay: {
    position: 'absolute',
    bottom: '10%',
    left: '5%',
    right: '5%',
    height: '15%',
    width: '90%',
    zIndex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    elevation: 5,
  },
  
  infoDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden', 
    marginRight: 10,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  companyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
  },

  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  infoDescription: {
    fontSize: 13,
    color: '#A5A5A5',
    marginBottom: 10,
  },
  employerName: {
    fontSize: 13,
    color: '#606060',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#E1F0FF',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 100,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#4894FE',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
