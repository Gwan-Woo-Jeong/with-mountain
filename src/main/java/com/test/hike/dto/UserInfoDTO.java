package com.test.hike.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoDTO {

	private String userId;
    private String locationId;    
    private String email;
    private String password;
    private String nickname;
    private String name;
    private String gender;
    private String birthday;
    private String intro;
    private String profileImage;  
    private String createDate;
    private UserTokenDTO userToken;
}
