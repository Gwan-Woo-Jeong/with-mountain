package com.test.hike.dto;

import lombok.Data;

@Data
public class MessageDTO {
	private String messageId;
 	private String chatMemberId;
	private String messageContent;
	private String messageSendTime;
	private String messageType;
	
}
