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


## 매뉴얼 콘텐츠 CRUD 관리 기능
- [x] 백엔드 API 라우터 확장 (createCategory, updateCategory, deleteCategory)
- [x] 백엔드 API 라우터 확장 (createItem, updateItem, deleteItem)
- [x] 관리자 페이지 레이아웃 구현
- [x] 카테고리 관리 UI 구현
- [x] 항목 관리 UI 구현
- [x] 폼 유효성 검사 구현
- [x] 에러 처리 및 사용자 피드백
- [x] CRUD 기능 테스트


## 매뉴얼 항목 이미지 기능
- [x] 데이터베이스 스키마 업데이트 (manualItemImages 테이블 추가)
- [x] 이미지 업로드 API 구현
- [x] 이미지 삭제 API 구현
- [x] 이미지 업로드 UI 컴포넌트 생성
- [x] 항목 관리 페이지에 이미지 관리 기능 추가
- [x] 매뉴얼 콘테늤트 표시 시 이미지 렌더링
- [x] 이미지 미리보기 기능
- [x] 이미지 기능 테스트


## HTML 콘른트 작성 기능
- [x] 리치 텍스트 에디터 라이브러리 설치 (TipTap 또는 Quill)
- [x] HTML 에디터 UI 컴포넌트 생성
- [x] 항목 관리 페이지에 HTML 에디터 통합
- [x] HTML 콘테늤트 데이터베이스 저장
- [x] 매뉴얼 콘테늤트 표시 시 HTML 렌더링
- [x] XSS 방지 및 보안 처리
- [x] HTML 에디터 기능 테스트

## 콘른테늤트 에디터 개선 및 에러 수정
- [x] 관리자 페이지 편집 에러 원인 파악 및 수정
- [x] 통합 콘테늤트 에디터 컴포넌트 재설계
- [x] HTML 에디터와 텍스트 에디터 모드 전환 기능
- [x] 에디터 내 이미지 삽입 기능 추가
- [x] 항목 관리 페이지 UI 개선
- [x] 에러 처리 및 사용자 피드백 개선
- [x] 통합 에디터 기능 테스트

## 긴급 버그 수정
- [x] HtmlEditor tableHeader 노드 타입 오류 수정
