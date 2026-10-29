# GitHub Pages 배포

1. Repository → Settings → Pages에서 Source를 **GitHub Actions**로 선택합니다.
2. `main`에 반영하거나 Actions에서 **Deploy website to GitHub Pages**를 실행합니다.
3. Validate와 Deploy 작업이 모두 성공했는지 확인합니다.
4. `https://ysmartgrid-stack.github.io/yonsei-smartgrid/`에서 화면·영상·링크를 확인합니다.

워크플로는 JavaScript와 로컬 참조 파일을 검사하고 `dist/`만 배포합니다.
서버 측 앱, Jekyll, npm 의존성 설치는 필요하지 않습니다.

## 공식 도메인은 별도 전환

현재 구성은 GitHub 프로젝트 주소를 사용하며 `CNAME` 파일을 추가하지 않습니다.
`smartgrid.yonsei.ac.kr`의 기존 호스팅과 DNS는 이 배포로 변경되지 않습니다.

향후 공식 도메인 전환을 승인받으면:

1. 소유 계정에서 필요한 도메인 검증을 먼저 완료합니다.
2. Pages에 `smartgrid.yonsei.ac.kr`을 등록합니다.
3. 사이트 canonical/OG/Twitter 주소를 공식 도메인으로 변경합니다.
4. 연세대 DNS 담당자에게 CNAME 대상 `ysmartgrid-stack.github.io`를 전달합니다.
   DNS 대상에 `/yonsei-smartgrid/` 경로를 넣지 않습니다.
5. DNS·HTTPS·실제 화면을 확인한 후 기존 호스팅 정리를 결정합니다.

## 영상과 파일 전송

소개영상은 약 45MB입니다. 브라우저 업로드 한도를 넘으므로 Git 또는 GitHub Desktop으로 반영합니다.
원본 영상을 정적 파일로 포함하며 Git LFS 포인터로 대체하지 않습니다.

## 실패 시 확인

- Validate: JavaScript 오류나 누락된 파일을 수정합니다.
- Configure Pages: Pages Source가 GitHub Actions인지 확인합니다.
- Deploy: Pages 권한과 `github-pages` environment 제한을 확인합니다.
- 이미지: 프로젝트 경로·대소문자·상대 경로를 확인합니다.
- 이전 화면: 배포 커밋을 확인하고 브라우저를 새로고침합니다.
