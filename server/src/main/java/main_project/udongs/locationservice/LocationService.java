package main_project.udongs.locationservice;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;

@Configuration
@Slf4j
public class LocationService {

    /*
    받아온 위도 경도로 주소 받아오기
    */
    public String coordToAddr(Double longitude, Double latitude){
        String url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x="+longitude+"&y="+latitude;
        String addr = "";
        try{
            addr = getRegionAddress(getJSONData(url));
            //addr = getJSONData(url);
            log.info(addr);
        }catch(Exception e){
            log.warn("주소 api 요청 에러");
            e.printStackTrace();
        }
        return addr;
    }

    /*
      REST API로 통신하여 받은 JSON형태의 데이터를 String으로 받아오는 메소드
    */
    private static String getJSONData(String apiUrl) throws Exception {
        HttpURLConnection conn = null;
        StringBuffer response = new StringBuffer();

        //인증키
        String auth = "KakaoAK " + "4b3f0bd16d0a149b391de0b8eff3d190";

        //URL 설정
        URL url = new URL(apiUrl);

        
        
        conn = (HttpURLConnection) url.openConnection();

        //Request 형식 설정
        //Header를 읽을때 암묵적인 connection이루어짐 
        conn.setRequestMethod("GET");
        conn.setRequestProperty("X-Requested-With", "curl");
        conn.setRequestProperty("Authorization", auth);

        //request에 JSON data 준비
        conn.setDoOutput(true);

        //보내고 결과값 받기
        int responseCode = conn.getResponseCode();
        if (responseCode == 400) {
            log.warn("400:: 해당 명령을 실행할 수 없음");
        } else if (responseCode == 401) {
            log.warn("401:: Authorization가 잘못됨");
        } else if (responseCode == 500) {
            log.warn("500:: 서버 에러, 문의 필요");
        } else {

            // 성공 후 응답 JSON 데이터받기
            Charset charset = Charset.forName("UTF-8");
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), charset));

            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
        }
        return response.toString();
    }

    /*
     JSON형태의 String 데이터에서 주소값(address_name)만 받아오기
    */
    private static String getRegionAddress(String jsonString) {
        String value = "";
        JSONObject jObj = (JSONObject) JSONValue.parse(jsonString);
        JSONObject meta = (JSONObject) jObj.get("meta");
        long size = (long) meta.get("total_count");

        if(size>0){
            JSONArray jArray = (JSONArray) jObj.get("documents");
            JSONObject subJobj = (JSONObject) jArray.get(0);
            JSONObject roadAddress =  (JSONObject) subJobj.get("road_address");

            //도로명주소 없으면 일반 주소로 찾기
            if(roadAddress == null){

                JSONObject address = (JSONObject) subJobj.get("address");

                //서울로 시작하면 바로 반환
                if("서울".equals((String)address.get("region_1depth_name"))){
                    return "서울";
                } else {
                    value = (String) address.get("region_2depth_name");
                }

            }else{

                if("서울".equals((String)roadAddress.get("region_1depth_name"))){
                    return "서울";
                } else {
                    value = (String) roadAddress.get("region_2depth_name");
                }
            }

            if(value.equals("") || value==null){
                subJobj = (JSONObject) jArray.get(1);
                subJobj = (JSONObject) subJobj.get("address");
                value =(String) subJobj.get("region_2depth_name");
            }
        }
        return value;
    }
}

/*
* "documents": [
    {
      "address_name": "전북 익산시 부송동 100",
      "y": "35.97664845766847",
      "x": "126.99597295767953",
      "address_type": "REGION_ADDR",
      "address": {
        "address_name": "전북 익산시 부송동 100",
        "region_1depth_name": "전북",
        "region_2depth_name": "익산시",
        "region_3depth_name": "부송동",
        "region_3depth_h_name": "삼성동",
        "h_code": "4514069000",
        "b_code": "4514013400",
        "mountain_yn": "N",
        "main_address_no": "100",
        "sub_address_no": "",
        "x": "126.99597295767953",
        "y": "35.97664845766847"
      },
      "road_address": {
        "address_name": "전북 익산시 망산길 11-17",
        "region_1depth_name": "전북",
        "region_2depth_name": "익산시",
        "region_3depth_name": "부송동",
        "road_name": "망산길",
        "underground_yn": "N",
        "main_building_no": "11",
        "sub_building_no": "17",
        "building_name": "",
        "zone_no": "54547",
        "y": "35.976749396987046",
        "x": "126.99599512792346"
      }
    },*/
