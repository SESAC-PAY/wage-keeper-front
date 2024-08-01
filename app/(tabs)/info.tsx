import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Modal, TouchableOpacity,ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { SERVER_URL } from '@/shared/constants';

export default function InfoScreen() {
 
  const route = useRoute();
  const companyId = Number(route.params?.id);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const router = useRouter();

  const languageCodeMap: { [key: string]: string } = {
    '한국어': 'ko',
    'English': 'en',
    '中文': 'zh-CN',
    'Tiếng Việt': 'vi',
    'नेपाली': 'ne',
    'O\'zbekcha': 'uz',
    'ខ្មែរ': 'km'
  };

  const getLanguageCode = (language: string | null): string => {
    return language ? languageCodeMap[language] || 'ko' : 'ko'; 
  };

  useEffect(() => {
    setLoading(true);
    const languageCode = getLanguageCode(selectedLanguage); 
    fetch(`${SERVER_URL}/api/review/${companyId}?language=${languageCode}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setData(result.data);
        } else {
          setError('데이터를 불러오는 데 실패했습니다.');
        }
      })
      .catch(() => {
        setError('데이터를 불러오는 데 실패했습니다.');
      })
      .finally(() => setLoading(false));
  }, [selectedLanguage]);

  useEffect(() => {
    if (isModalVisible && selectedLanguage === null) {

      const defaultLanguage = 'English'; 
      setSelectedLanguage(defaultLanguage);
      setIsModalVisible(false); 
    }
  }, [isModalVisible, selectedLanguage]);

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!data) {
    return null;
  }

  const { companyInfo, reviewScore, reviewList, reportIssue } = data;

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const totalStars = 5;

    return (
      <View style={styles.starsContainer}>
        {[...Array(totalStars)].map((_, index) => {
          let starColor = '#ddd'; 
          if (index < fullStars) {
            starColor = '#4894FE'; 
          }
          return (
            <Text key={index} style={[styles.star, { color: starColor }]}>
              {index < fullStars ? '★' : index === fullStars && hasHalfStar ? '☆' : '☆'}
            </Text>
          );
        })}
      </View>
    );
  };

  

  const renderStars2 = (score: number) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const totalStars = 5;

    return (
      <View style={styles.starsContainer}>
        {[...Array(totalStars)].map((_, index) => {
          let starColor = '#ddd'; // 기본색상
          if (index < fullStars) {
            starColor = '#4894FE'; // 채워진 별 색상
          }
          return (
            <Text key={index} style={[styles.star2, { color: starColor }]}>
              {index < fullStars ? '★' : index === fullStars && hasHalfStar ? '☆' : '☆'}
            </Text>
          );
        })}
      </View>
    );
  };


  const formatScore = (score: number | null) => {
    return score !== null && score !== undefined ? score.toFixed(1) : 'N/A';
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Text style={styles.languageButton}> >  언어 선택</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>언어를 선택하세요</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              setSelectedLanguage('한국어');
              console.log("한국어 선택");
              setIsModalVisible(false);
            }}>
              <Text style={styles.modalButtonText}>한국어</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              setSelectedLanguage('English');
              console.log("English 선택");
              setIsModalVisible(false);
            }}>
              <Text style={styles.modalButtonText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              setSelectedLanguage('中文');
              console.log("中文选择");
              setIsModalVisible(false);
            }}>
              <Text style={styles.modalButtonText}>中文</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              setSelectedLanguage('Tiếng Việt');
              console.log("Tiếng Việt chọn");
              setIsModalVisible(false);
            }}>
              <Text style={styles.modalButtonText}>Tiếng Việt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              setSelectedLanguage('नेपाली');
              console.log("नेपाली चयन");
              setIsModalVisible(false);
            }}>
              <Text style={styles.modalButtonText}>नेपाली</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              setSelectedLanguage('O\'zbekcha');
              console.log("O'zbekcha tanlash");
              setIsModalVisible(false);
            }}>
              <Text style={styles.modalButtonText}>O'zbekcha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              setSelectedLanguage('ខ្មែរ');
              console.log("ខ្មែរ ជ្រើសរើស");
              setIsModalVisible(false);
            }}>
              <Text style={styles.modalButtonText}>ខ្មែរ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.companyInfo}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: companyInfo.image }} style={styles.companyImage} />
        </View>
        <View style={styles.companyDetails}>
          <Text style={styles.companyName}>{companyInfo.companyName}</Text>
          <Text style={styles.companyAddress}>{companyInfo.address}</Text>
          <TouchableOpacity
            style={styles.rateButton}
          >
            <Text style={styles.rateButtonText}>평가하기</Text>
          </TouchableOpacity>
        </View>
      </View>

    
      <View style={styles.ratingContainer2}>
            < View style={styles.starsWrapper2}>
            {renderStars2(reviewScore.totalAvgScore ?? 0)}
            </View>
            <Text style={styles.ratingValue2}>{formatScore(reviewScore.totalAvgScore)}</Text>
           
        </View>

      <View style={styles.separator} />

      {reportIssue.reportIssue ? (
        <View>
          <Text style={styles.reportTitle}>신고 기록</Text>
          <View style={styles.reportIssueContainerRed}>
            <Text style={styles.reportIssueTextRed}>체불 사업주 공개명단에 등록되어 있는 사업 주입니다.</Text>
          </View>
          <View style={reportIssue.reportedCount === 0 ? styles.reportIssueContainerGreen : styles.reportIssueContainerRed}>
            <Text style={reportIssue.reportedCount === 0 ? styles.reportIssueTextGreen : styles.reportIssueTextRed}>
              신고 횟수: {reportIssue.reportedCount}회
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.reportIssueContainerGreen}>
          <Text style={styles.reportIssueTextGreen}>체불 사업주 공개명단에 등록되어 있지 않은 사업주입니다.</Text>
        </View>
      )}

      <View style={styles.detailSection}>
        <Text style={styles.detailTitle}>상세정보</Text>
        <View style={styles.detailInfoContainer}>
          <View style={styles.detailInfo}>
            <Text style={styles.detailLabel}>근무지역:</Text>
            <Text style={styles.detailValue}>{companyInfo.address}</Text>
          </View>
          <View style={styles.detailInfo}>
            <Text style={styles.detailLabel}>고용주:</Text>
            <Text style={styles.detailValue}>{companyInfo.employer}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reviewSummary}>
        <View style={styles.ratingDetailContainer}>
          <View style={styles.ratingDetail}>
            <Text style={styles.ratingDetailTitle}>임금 지급의 적절성:         </Text>
            {renderStars(reviewScore.totalAvgProperPaymentScore ?? 0)}
            <Text style={styles.ratingValue}>{formatScore(reviewScore.totalAvgProperPaymentScore)}</Text>
          </View>
          <View style={styles.ratingDetail}>
            <Text style={styles.ratingDetailTitle}>업무 내용 및 환경:           </Text>
            {renderStars(reviewScore.totalAvgEnvironmentScore ?? 0)}
            <Text style={styles.ratingValue}>{formatScore(reviewScore.totalAvgEnvironmentScore)}</Text>
          </View>
          <View style={styles.ratingDetail}>
            <Text style={styles.ratingDetailTitle}>기숙사 제공 여부 및 상태:</Text>
            {renderStars(reviewScore.totalAvgDomitoryScore ?? 0)}
            <Text style={styles.ratingValue}>{formatScore(reviewScore.totalAvgDomitoryScore)}</Text>
          </View>
          <View style={styles.ratingDetail}>
            <Text style={styles.ratingDetailTitle}>고용 계약서 준수 여부:    </Text>
            {renderStars(reviewScore.totalAvgFullfillContractScore ?? 0)}
            <Text style={styles.ratingValue}>{formatScore(reviewScore.totalAvgFullfillContractScore)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reviewsList}>
      <View style={styles.separator} />
        <Text style={styles.reviewsTitle}>상세 리뷰</Text>
        <FlatList
          data={reviewList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewItemTitle}>{item.title}</Text>
               <Text style={styles.reviewDate}>{item.createdDate}</Text>
               </View>
               <View style={styles.reviewScoreContainer}>
               {renderStars(item.averageScore ?? 0)}
               <Text style={styles.ratingValue}>{formatScore(item.averageScore)}</Text>
                </View>
                <Text style={styles.reviewItemContent}>{item.content}</Text>
           
            </View>
          )}
        />
      </View>
    </View>
    </ScrollView>
  );
  

}
const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      backgroundColor: '#fff',
      padding: 20,
    },
    header: {
      alignItems: 'flex-end',
      marginTop: 30,
    },
    languageButton: {
      fontSize: 16,
      color: '#007BFF',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    modalButton: {
      borderWidth: 1,
      borderColor: '#007BFF',
      borderRadius: 5,
      paddingVertical: 10,
      width: '100%',
      alignItems: 'center',
      marginVertical: 5,
    },
    modalButtonText: {
      fontSize: 16,
      color: '#007BFF',
    },
    companyInfo: {
      flexDirection: 'row',
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      overflow: 'hidden',
      marginRight: 10,
    },
    companyImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    companyDetails: {
      flex: 1,
      alignItems: 'center',
    },
    companyName: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    companyAddress: {
      fontSize: 14,
      color: '#777',
      marginVertical: 10,
      textAlign: 'center',
    },
    rateButton: {
      backgroundColor: '#E1F0FF',
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 30,
      alignItems: 'center',
      marginTop: 10,
    },
    rateButtonText: {
      color: '#4894FE',
      fontWeight: 'bold',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start', // 별점과 별을 왼쪽으로 정렬
      marginVertical: 5,
    },
    starsContainer: {
      flexDirection: 'row',
      //alignItems: 'center',
    },
    star: {
      fontSize: 20, // 별의 크기
      lineHeight: 20, // 별의 높이 맞추기
      color: '#4894FE',
    },
    ratingValue: {
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 5, // 별과 점수 사이의 간격 조정
    },
    starsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // 별점을 오른쪽으로 정렬
      },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      marginBottom: 15,
    },
    reportTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    reportIssueContainerRed: {
      backgroundColor: '#f8d7da',
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
    },
    reportIssueTextRed: {
      color: '#721c24',
      fontSize: 16,
      fontWeight: 'bold',
    },
    reportIssueContainerGreen: {
      backgroundColor: '#d4edda',
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
    },
    reportIssueTextGreen: {
      color: '#155724',
      fontSize: 16,
      fontWeight: 'bold',
    },
    detailSection: {
      marginVertical: 20,
    },
    detailTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    detailInfoContainer: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
    },
    detailInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
      marginHorizontal:10
    },
    detailLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    detailValue: {
      fontSize: 16,
      color: '#555',
    },
    reviewSummary: {
      marginVertical: 5,
    },
    reviewTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    ratingDetailContainer: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      paddingHorizontal:20,
      paddingVertical:10,
      marginBottom: 20,
    },
    ratingDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    ratingDetailTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      marginRight: 10,
    },
    reviewsList: {
      flex: 1,
    },
    reviewsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    reviewContainer: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      reviewScoreContainer: {
        marginBottom: 10,
        flexDirection: 'row',
      },
      reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      reviewDate: {
        fontSize: 14,
        color: '#5A6580',
      },
      reviewRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      reviewScore: {
        fontSize: 14,
        marginLeft: 8,
      },
      reviewItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEB',
        marginTop:5,
        marginBottom:5
      },
      reviewItemTitle: {
        fontSize: 23,
      },
      reviewItemContent:{
        fontSize: 15,
        marginBottom:10
      },
    ratingContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:5,
        marginBottom:10,
        justifyContent: 'space-between',
      },
      starsWrapper2: {
        flexDirection: 'row',
        marginRight: 10,
      },
      star2: {
        fontSize: 38,
        lineHeight: 40, 
      },
      ratingValue2: {
        fontSize: 28,
        fontWeight: 'bold',
      },





  });