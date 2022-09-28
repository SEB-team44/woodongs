package main_project.udongs.s3upload;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3URI;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.repository.MemberRepository;
import main_project.udongs.oauth2.oauth.entity.ProviderType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class AwsS3Upload {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private final MemberRepository memberRepository;


    public String upload(MultipartFile multipartFile, Member member) throws IOException {

        //이미 이미지가 등록되있으면 그거 삭제후 등록
        //카카오는 처음에는 그냥 진행
        if(!member.getProfileImageUrl().contains("kakaocdn")) {
            if (member.getProfileImageUrl() != null) {
                delete(member);
            }
        }

        //파일이름 중복 방지 {UUID랜덤값 + 파일 원래 이름}
        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

        //파일 사이즈를 S3에 전달 (ObjectMetadata)
        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());

        //이미지 업로드
        amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

        log.debug("Successfully uploaded:{} ", s3FileName );

        //업로드 된 이미지의 url 정보 String으로 반환
        return amazonS3.getUrl(bucket, s3FileName).toString();
    }


    private void delete(Member member) {

            String s = member.getProfileImageUrl();
            AmazonS3URI s3URI = new AmazonS3URI(s);

            String key = URLDecoder.decode((s3URI.getKey().toString()), StandardCharsets.UTF_8);

                try {
                    DeleteObjectRequest deleteRequest = new DeleteObjectRequest(bucket, key);
                    amazonS3.deleteObject(deleteRequest);
                    log.debug("Deleted previous image:{} ", key );
                } catch(Exception e) {
                    e.printStackTrace();
                    log.error("Exception ERROR: {} ", e.getMessage());
                    throw e;
                }

        }
    }

