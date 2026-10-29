# 홈페이지 수정·인수인계

이 저장소는 검토된 정적 홈페이지 배포본을 관리합니다. `dist/`만 게시합니다.
로컬 원본 프로젝트 이름은 `yonsei-smartgrid-lab-desktop`입니다.

| 변경 대상 | 원본 프로젝트의 위치 |
| --- | --- |
| 연구 소개·과제·협력기관·교수 소개·명단 편집값 | `content/editorial.json` |
| 페이지 문구·렌더링·메뉴 동작 | `dist/app.js`, `dist/index.html` |
| 최종 글자·색·간격 | `dist/typography.css` |
| 기본 배치 | `dist/styles.css` |
| 로고·이미지·영상 | `dist/assets/` |

`dist/data.js`는 원본 프로젝트의 `scripts/import-content.py`가 생성합니다.
재생성하려면 원본 엑셀과 Python/openpyxl 환경이 필요합니다.
원본 엑셀은 이 공개 저장소에 포함하지 않습니다.

## 업데이트

1. 원본 프로젝트를 수정하고 필요한 데이터를 재생성합니다.
2. PC·모바일에서 내용, 메뉴, 연도 선택, 영상, 연락처를 검토합니다.
3. 검토된 `dist/`를 이 저장소에 복사합니다.
   교수님이 공개하는 CV PDF와 교수 프로필의 `cv` 링크를 함께 포함합니다.
4. canonical/OG/Twitter 주소를 `https://ysmartgrid-stack.github.io/yonsei-smartgrid/`에 맞춥니다.
5. `node scripts/sanitize-public.cjs`로 비표시 연락처와 내부 검토 메타데이터를 제외한 다음 `node scripts/check-site.cjs`를 실행하고 `main`에 반영합니다.
6. Actions 배포 성공과 실제 홈페이지를 확인합니다.

## 유지할 기준

- 사이트에 포함된 Pretendard Variable을 사용합니다.
- 안내 문구와 UI는 영어를 사용합니다.
- 상단 로고는 `dist/assets/branding/lab-wordmark.png` 원본을 사용하고 한글 표기도 유지합니다.
- 논문·특허 공식 제목, 발명자명과 기록된 기관 고유명사는 원문을 보존합니다.
- 기존 15분 소개영상은 방문자가 클릭하기 전에는 플레이어를 만들지 않습니다.
- 교수님 CV 파일과 다운로드 링크는 사용자 승인에 따라 공개합니다.
- README 등 저장소 안내 문서에 개인 연락처를 추가하지 않습니다.
- 화면에 쓰이지 않는 이메일, 원본 검토 메모, 출처 파일명과 편집 이력은 내부 원본에만 보관합니다.
- 새 커밋은 운영 계정의 GitHub `noreply` 주소를 사용합니다.

## 인수인계

- GitHub 저장소와 Pages 설정 접근 권한을 인계합니다.
- 원본 프로젝트·엑셀·검수 기록은 별도 내부 저장 위치에서 인계합니다.
- 비밀번호나 토큰을 저장소에 넣지 않습니다.
- 도메인 담당자와 연세대 DNS 담당 경로는 별도로 인계합니다.
- 소유권 이전이나 계정명 변경 시 Pages 주소와 배포 설정을 재확인합니다.
