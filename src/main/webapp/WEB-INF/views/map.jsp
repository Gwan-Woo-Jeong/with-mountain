<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title></title>
	<style>
		#map {
			width: 1000px;
			height: 700px;
		}
	</style>
	
</head>
<body>
	<!-- map.jsp -->
	<h1>Kakao Map <small>GPX 데이터 출력하기</small></h1>
	
	<div>
		<div id="map"></div>
	</div>
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.14.0/proj4.js"></script>
	<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d8de9ed5ee23a0becf5c950f18bbddf4&autoload=false"></script>
	<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
	<script>
		//console.log('${spotList}'); // 전부 문자열로 리턴되기 때문에 추천하지 않음
		
		kakao.maps.load(function() {
		
			var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
	        var options = { //지도를 생성할 때 필요한 기본 옵션
	            center: new kakao.maps.LatLng(37.659086, 126.978270), //지도의 중심좌표.
	            level: 7 //지도의 레벨(확대, 축소 정도)
	    	};

	        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
			
			
			
			// 등산로 지점 SPOT들을 Marker로 표시할 좌표들이 들어갈 객체 배열
			let trailEndPoint = []; // // spotType == '시종점'
			let trailJunction = []; // spotType == '분기점'
			
			/* JSTL을 사용해서 데이터를 Javascript에서 사용할 수 있도록 JSON 형식으로 변환 */
			<c:forEach var="spotList" items="${spotList}">
				<c:if test="${spotList.spotType == '시종점'}">
				trailEndPoint.push({
					spotId: "${spotList.spotId}",
					mtId: "${spotList.mtId}",
					spotType: "${spotList.spotType}",
					mtName: "${spotList.mtName}",
					spotX: "${spotList.spotX}",
					spotY: "${spotList.spotY}"
				});
				</c:if>
				<c:if test="${spotList.spotType == '분기점'}">
				trailJunction.push({
					spotId: "${spotList.spotId}",
					mtId: "${spotList.mtId}",
					spotType: "${spotList.spotType}",
					mtName: "${spotList.mtName}",
					spotX: "${spotList.spotX}",
					spotY: "${spotList.spotY}"
				});
				</c:if>
			</c:forEach>
			
			// 좌표값도 전부 number형이 아니라 String형으로 저장되어 있음에 주의.
			//console.log(trailEndPoint);
			//console.log(trailJunction);
			
			// 시종점 그리기
			let spotEndPoint = [];			
			
			for (var i = 0; i < trailEndPoint.length; i++) {
				spotEndPoint.push(new kakao.maps.LatLng(trailEndPoint[i].spotY, trailEndPoint[i].spotX));
			}
				
			var imageSrc = 'resources/static/images/spot-start.svg';
				
			for (var i = 0; i < spotEndPoint.length; i++) {
				
				// Marker 이미지의 size 설정
				var imageSize = new kakao.maps.Size(16, 16);
				
				// Marker 이미지 생성
				var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
				
				// Marker 생성
				var marker = new kakao.maps.Marker({
					map: map, // Marker를 표시할 지도
					position: spotEndPoint[i], // Marker를 표시할 위치
					image: markerImage // Marker 이미지
				});
			
			}
			
			// 분기점 그리기
			let spotJunction = [];
			
			for (var i = 0; i < trailJunction.length; i++) {
				spotJunction.push(new kakao.maps.LatLng(trailJunction[i].spotY, trailJunction[i].spotX));
			}
			
			imageSrc = 'resources/static/images/point.svg';
			
			for (var i = 0; i < spotJunction.length; i++) {
				
				// Marker 이미지의 size 설정
				var imageSize = new kakao.maps.Size(8, 8);
				
				// Marker 이미지 생성
				var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
				
				// Marker 생성
				var marker = new kakao.maps.Marker({
					map: map, // Marker를 표시할 지도
					position: spotJunction[i], // Marker를 표시할 위치
					image: markerImage // Marker 이미지
				});
			
			}
			/*
			// 구간 정보 가져오기
			let lineRoad = [];
			
			<c:forEach var="roadList" items="${roadList}">
			lineRoad.push({
				coordId: "${roadList.coordId}",
				mtId: "${roadList.mtId}",
				roadId: "${roadList.roadId}",
				roadKm: "${roadList.roadKm}",
				roadLevel: "${roadList.roadLevel}",
				roadTimeUp: "${roadList.roadTimeUp}",
				roadTimeDown: "${roadList.roadTimeDown}",
				roadSeq: "${roadList.roadSeq}",
				roadX: "${roadList.roadX}",
				roadY: "${roadList.roadY}",
			});
			</c:forEach>
			*/
			
			// 할 일: 등산로 구간별로 출력해야 함.
			// 일단 다 갖고오고 polyline 그릴 때만 나누면 되잖아?
			
			/*
			let temp = [];
				
				for (var i = 0; i < coords4326.length; i++) {
					temp.push(new kakao.maps.LatLng(coords4326[i][1], coords4326[i][0]));
				}
				console.log(temp);
				
				
			let polyline = new kakao.maps.Polyline({
				map: map,
				path: temp,
				strokeWeight: 15,
				strokeColor: '#FF2400',
				strokeStyle: 'solid'
			});
				
			let polylinein = new kakao.maps.Polyline({
				map: map,
				path: temp,
				strokeWeight: 3,
				strokeColor: 'white',
				strokeStyle: 'dash',
				endArrow: 'true'
			});
			
			polyline.setMap(map);
			polylinein.setMap(map);
			polyline.getMap();
			*/
		});
	</script>
</body>
</html>