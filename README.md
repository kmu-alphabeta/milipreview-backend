# Milipreview Backend

군 입대 지원자를 위한 예측 및 평가를 제공하는 백엔드 시스템입니다. [NestJS](https://nestjs.com/) 기반으로 개발되었으며, 확장성과 유지보수를 고려한 설계를 목표로 합니다.

---

## 🚀 프로젝트 소개

**Milipreview Backend**는 군사 관련 지원자 데이터를 분석하여 예측 결과를 생성하고 관리하는 백엔드 시스템입니다. RESTful API를 통해 다양한 기능을 제공합니다.

---

## 주요 기능

- **지원자 데이터 관리**
    
    지원자의 데이터를 생성, 조회, 수정, 삭제하는 기능.
    
- **예측 모델 호출 및 결과 반환**
    
    외부 예측 모델과 통신하여 결과를 제공.
    
- **예측 기록 조회 및 생성**
    
    지원자의 예측 기록을 저장하고 관리.
    
- **인증 및 사용자 관리**
    
    JWT 기반 인증 및 권한 부여 기능.
    

---

## 🛠 기술 스택

- **프레임워크**: [NestJS](https://nestjs.com/)
- **언어**: TypeScript
- **데이터베이스**: PostgreSQL
- **API**: RESTful API
- **배포 환경**: AWS (EC2, RDS, S3)
- **테스트**: Jest (유닛 및 통합 테스트)

---

## 📂 디렉토리 구조

```bash
src/
├── additional-form       # 추가 양식 처리
├── all-form              # 모든 양식 관리
├── auth                  # 사용자 인증 및 권한 관리
├── common-form           # 공통 DTO 및 로직
├── entities              # 데이터베이스 엔티티 정의
├── history               # 예측 기록 관리
└── main.ts               # 애플리케이션 진입점
```

---

## 💻 설치 및 실행 방법

### 로컬 개발 환경 설정

### 1. 레포지토리 클론

```bash
git clone https://github.com/kmu-alphabeta/milipreview-backend.git
cd milipreview-backend
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```makefile
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
AWS_S3_BUCKET=your_s3_bucket_name
AWS_REGION=your_aws_region
```

---

### 4. 애플리케이션 실행

- 개발 모드
    
    ```bash
    npm run start:dev
    ```
    
- 프로덕션 모드
    
    ```bash
    npm run start:prod
    ```
    

### 테스트 실행

```bash
npm run test
npm run test:e2e
```

---

## 📑 API 문서

API 문서는 Swagger를 통해 제공됩니다.

애플리케이션 실행 후 http://localhost:3000/api로 접근하세요.

---
