package com.test.hike.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class MemberDTO {
	private String memberId;
	private String clubId;
	private String userId;
	private String memberType;
	private String memberRegdate;
	private String memberOutDate;
	private String memberOutStatus;
}
