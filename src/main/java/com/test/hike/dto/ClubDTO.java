package com.test.hike.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class ClubDTO {
	private String clubId;
    private String clubLocationId;
    private String clubName;
    private String clubIsPrivate;
    private String clubMaxMember;
    private String clubIntro;
    private String clubImage;
    private String clubCreateDate;
    private String clubCode;
    private String clubLocationName; // Location의 name을 위해

    private ArrayList<String> clubTag;	//해시 태그
    private String clubIsTag;			//매핑된 해시태그 개수

    private int clubMemberCount; //멤버 인원수
}