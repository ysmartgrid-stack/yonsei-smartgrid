# Yonsei University Smart Grid Laboratory

연세대학교 스마트그리드 연구실 홈페이지 배포 준비 저장소입니다.

## 현재 상태

- 저장소 기본 브랜치: `main`
- 홈페이지 파일: 아직 업로드하지 않음
- GitHub Pages: 아직 활성화하지 않음
- 사용자 도메인 및 연세대 DNS: 아직 변경하지 않음

## 예정 구성

홈페이지 메뉴는 Home / Research / Publications / Team / Contact입니다. 기존에 제작한 정적 HTML, CSS, JavaScript 사이트를 사용할 예정입니다.

## 배포 순서

1. 검수된 `dist` 내용만 업로드합니다. `index.html`은 배포 폴더 최상위에 둡니다.
2. 정적 파일 배포 시 `.nojekyll` 파일을 추가합니다.
3. GitHub Pages의 배포 원본을 설정하고 임시 주소에서 PC/모바일, 이미지, 영상, 링크를 확인합니다.
4. 최종 승인 후 GitHub Pages에 `smartgrid.yonsei.ac.kr` 사용자 도메인을 등록합니다.
5. 연세대 DNS 담당자에게 CNAME 대상 `ysmartgrid-stack.github.io`로 변경을 요청합니다. CNAME 값에 저장소 경로는 넣지 않습니다.
6. HTTPS와 실제 도메인 접속을 확인한 후 기존 호스팅을 정리합니다.

## 운영 및 인수인계

- 원본 엑셀, 내부 검토자료, 백업, 인증정보는 이 공개 저장소에 업로드하지 않습니다.
- 내용과 디자인만 변경하고 같은 배포 위치와 사용자 도메인 설정을 유지하면 일반적으로 DNS 변경은 필요하지 않습니다.
- 계정명 변경, 소유권 이전, 호스팅 이전 시 Pages와 DNS 설정을 재확인합니다.
- 연세대 도메인의 사용기간 연장과 담당자 인계는 별도로 관리합니다.
- 소개영상은 약 45MB이므로 브라우저 업로드 대신 Git 또는 GitHub Desktop 업로드를 준비합니다.
