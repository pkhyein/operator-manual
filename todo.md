# 운영자 매뉴얼 웹사이트 TODO

## 기본 기능
- [x] 소프트 미니멀리즘 디자인 시스템 구현
- [x] 사이드바 네비게이션 구현
- [x] 검색 기능 구현
- [x] 4개 주요 메뉴 구현 (이벤트 준비, 이벤트 통계, GTT Show, 운영진 메뉴)
- [x] 메뉴 항목 아코디언 기능 구현
- [x] 콘텐츠 표시 컴포넌트 구현

## 풀스택 전환
- [x] web-db-user 기능 추가
- [x] 데이터베이스 스키마 설계 (users, manualCategories, manualItems, files, searchLogs)
- [x] 데이터베이스 마이그레이션 실행
- [x] 드리즐 relations 설정

## 파일 관리 기능
- [x] FileUpload 컴포넌트 구현
- [x] FileManager 페이지 구현
- [x] 파일 업로드 UI 구현
- [x] 파일 다운로드 기능 구현
- [x] 파일 검색 기능 구현

## 백엔드 API
- [x] useAuth 훅 구현
- [x] manual 라우터 구현 (getCategories, getItemsByCategory, search)
- [x] files 라우터 구현 (list, upload, getDownloadUrl, delete)
- [x] 데이터베이스 함수 구현 (getManualCategories, getManualItemsByCategory, searchManualContent, getFiles, insertFile, deleteFile, logSearch)

## 테스트
- [x] 데이터베이스 함수 테스트 작성
- [x] API 라우터 테스트 작성
- [x] 모든 테스트 통과 확인

## 향후 개선 사항
- [ ] 다크 모드 지원
- [ ] 즐겨찾기 기능
- [ ] 실제 S3 통합 (현재는 mock 상태)
- [ ] 매뉴얼 콘텐츠 CRUD 관리 페이지
- [ ] 사용자 권한 관리 (admin/user)
- [ ] 파일 버전 관리
- [ ] 실시간 검색 분석 대시보드
