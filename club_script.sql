select * from club;
select * from Member;
select * from userinfo;
select * from location;

select count(*) from Member where club_id = 1;


insert all 
	 into Club(club_id, location_id, name, is_private, max_member, intro, image, create_date, code)
		VALUES(seqClub.nextVal, 1, '테스트모임', 0, 20, '테스트입니다.', default, sysdate, 'ASD123')
	into Member(member_id, club_id, user_id, type, regdate, out_date, out_status)
		VALUES(seqMember.nextVal, seqClub.currVal, 11, '0', sysdate, null, '0')
select * from dual;


UPDATE Club SET image = 'club-image1.jpg' WHERE club_id = 1;
UPDATE Club SET image = 'club-image2.jpg' WHERE club_id = 2;
UPDATE Club SET image = 'club-image3.jpg' WHERE club_id = 3;
UPDATE Club SET image = 'club-image4.jpg' WHERE club_id = 4;
UPDATE Club SET image = 'club-image5.jpg' WHERE club_id = 5;
UPDATE Club SET image = 'club-image6.jpg' WHERE club_id = 6;
UPDATE Club SET image = 'club-image7.jpg' WHERE club_id = 7;
UPDATE Club SET image = 'club-image8.jpg' WHERE club_id = 8;
UPDATE Club SET image = 'club-image9.jpg' WHERE club_id = 9;
UPDATE Club SET image = 'club-image10.jpg' WHERE club_id = 10;

commit;





SELECT
    c.club_id AS club_id,
    c.location_id AS location_id,
    c.name AS name,
    c.is_private AS is_private,
    c.max_member AS max_member,
    c.intro AS intro,
    c.image AS image,
    c.create_date AS create_date,
    c.code AS code,
    l.name AS locationName,
    (SELECT COUNT(*) FROM Member m WHERE m.club_id = c.club_id) AS clubMemberCount
FROM
    club c
JOIN
    location l ON c.location_id = l.location_id
ORDER BY
    c.club_id DESC;
    

DELETE FROM club where club_id = 21;
DELETE FROM club where club_id = 22;
DELETE FROM club where club_id = 23;
DELETE FROM club where club_id = 24;
DELETE FROM club where club_id = 41;
DELETE FROM club where club_id = 42;
DELETE FROM club where club_id = 43;
DELETE FROM club where club_id = 44;
DELETE FROM member where member_id = 41;
DELETE FROM member where member_id = 42;
DELETE FROM member where member_id = 43;

   
-- 시퀀스 삭제
DROP SEQUENCE seqClub;
DROP SEQUENCE seqMember;

-- 시퀀스 재생성
CREATE SEQUENCE seqClub
START WITH 11
INCREMENT BY 1;
CREATE SEQUENCE seqClub
START WITH 31
INCREMENT BY 1;

commit;