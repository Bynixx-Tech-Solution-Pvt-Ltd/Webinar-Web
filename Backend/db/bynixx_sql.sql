-- ============================================================
-- BYNIXX PLATFORM — COMPLETE DATABASE SCHEMA
-- Generated: 2026-06-06
-- Database: MySQL / MongoDB-compatible relational model
-- ============================================================

-- ============================================================
-- 1. USERS TABLE
-- ============================================================
CREATE TABLE users (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid                VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
    name                VARCHAR(150) NOT NULL,
    email               VARCHAR(255) NOT NULL UNIQUE,
    phone               VARCHAR(20),
    password_hash       VARCHAR(255) NOT NULL,
    role                ENUM('student', 'mentor', 'admin', 'super_admin') NOT NULL DEFAULT 'student',
    profile_picture_url VARCHAR(500),
    bio                 TEXT,
    preferred_language  ENUM('english', 'tamil', 'hindi') NOT NULL DEFAULT 'english',
    gender              ENUM('male', 'female', 'other', 'prefer_not_to_say'),
    date_of_birth       DATE,
    state               VARCHAR(100),
    city                VARCHAR(100),
    profile_type        ENUM('student','assistant_professor','associate_professor','professor','other') DEFAULT 'student',
    college_name        VARCHAR(255),
    company_name        VARCHAR(255),
    graduation_year     YEAR,
    experience_years    TINYINT UNSIGNED,
    degree              VARCHAR(100),
    year_of_study       TINYINT UNSIGNED,
    linkedin_url        VARCHAR(500),
    github_url          VARCHAR(500),
    is_email_verified   BOOLEAN NOT NULL DEFAULT FALSE,
    is_phone_verified   BOOLEAN NOT NULL DEFAULT FALSE,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    is_blocked          BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at       DATETIME,
    login_count         INT UNSIGNED NOT NULL DEFAULT 0,
    timezone            VARCHAR(60) NOT NULL DEFAULT 'Asia/Kolkata',
    referral_code       VARCHAR(20) UNIQUE,
    referred_by_user_id BIGINT UNSIGNED,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at          DATETIME,
    FOREIGN KEY (referred_by_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================================
-- 2. USER_AUTH_TOKENS TABLE  (JWT / refresh tokens)
-- ============================================================
CREATE TABLE user_auth_tokens (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    token_hash      VARCHAR(255) NOT NULL UNIQUE,
    token_type      ENUM('access', 'refresh', 'email_verify', 'password_reset', 'session') NOT NULL,
    device_info     VARCHAR(500),
    ip_address      VARCHAR(45),
    expires_at      DATETIME NOT NULL,
    is_revoked      BOOLEAN NOT NULL DEFAULT FALSE,
    revoked_at      DATETIME,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_token (user_id, token_type),
    INDEX idx_token_hash (token_hash)
);

-- ============================================================
-- 3. CATEGORIES TABLE  (AI, Cybersecurity, etc.)
-- ============================================================
CREATE TABLE categories (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL UNIQUE,
    slug            VARCHAR(120) NOT NULL UNIQUE,
    description     TEXT,
    icon_url        VARCHAR(500),
    banner_url      VARCHAR(500),
    color_hex       VARCHAR(7),
    sort_order      SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- 4. COURSES TABLE
-- ============================================================
CREATE TABLE courses (
    id                      BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid                    VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
    category_id             INT UNSIGNED NOT NULL,
    title                   VARCHAR(255) NOT NULL,
    slug                    VARCHAR(280) NOT NULL UNIQUE,
    subtitle                VARCHAR(500),
    description             TEXT,
    language                ENUM('english', 'tamil', 'hindi') NOT NULL DEFAULT 'english',
    thumbnail_url           VARCHAR(500),
    trailer_video_url       VARCHAR(500),
    level                   ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
    duration_days           TINYINT UNSIGNED NOT NULL DEFAULT 30 COMMENT '30 or 45 day program',
    total_tasks             SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    price                   DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    discounted_price        DECIMAL(10,2),
    currency                VARCHAR(5) NOT NULL DEFAULT 'INR',
    is_free                 BOOLEAN NOT NULL DEFAULT FALSE,
    is_published            BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured             BOOLEAN NOT NULL DEFAULT FALSE,
    enrollment_limit        INT UNSIGNED COMMENT 'NULL = unlimited',
    enrollment_count        INT UNSIGNED NOT NULL DEFAULT 0,
    completion_count        INT UNSIGNED NOT NULL DEFAULT 0,
    average_rating          DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    total_ratings           INT UNSIGNED NOT NULL DEFAULT 0,
    prerequisites           TEXT COMMENT 'JSON array of prerequisite course IDs or text',
    outcomes                TEXT COMMENT 'JSON array of learning outcomes',
    tags                    VARCHAR(500) COMMENT 'comma-separated tags',
    seo_title               VARCHAR(255),
    seo_description         VARCHAR(500),
    created_by_admin_id     BIGINT UNSIGNED NOT NULL,
    published_at            DATETIME,
    created_at              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at              DATETIME,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (created_by_admin_id) REFERENCES users(id)
);

-- ============================================================
-- 5. COURSE_MODULES TABLE  (weekly/topic groupings within a course)
-- ============================================================
CREATE TABLE course_modules (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_id       BIGINT UNSIGNED NOT NULL,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    module_number   SMALLINT UNSIGNED NOT NULL,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY uq_course_module (course_id, module_number)
);

-- ============================================================
-- 6. TASKS TABLE  (daily learning units / assignments)
-- ============================================================
CREATE TABLE tasks (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_id           BIGINT UNSIGNED NOT NULL,
    module_id           BIGINT UNSIGNED,
    day_number          SMALLINT UNSIGNED NOT NULL COMMENT 'Day 1..45',
    title               VARCHAR(255) NOT NULL,
    description         TEXT,
    content_type        ENUM('video', 'document', 'external_link', 'assessment', 'project', 'quiz', 'reading') NOT NULL DEFAULT 'video',
    content_url         VARCHAR(500) COMMENT 'video/doc/link URL',
    content_body        LONGTEXT COMMENT 'inline text/HTML content',
    estimated_minutes   SMALLINT UNSIGNED,
    submission_required BOOLEAN NOT NULL DEFAULT TRUE,
    submission_type     ENUM('file_upload', 'github_link', 'external_url', 'text', 'none') NOT NULL DEFAULT 'file_upload',
    allowed_file_types  VARCHAR(200) COMMENT 'csv of extensions: pdf,zip,py',
    max_file_size_mb    TINYINT UNSIGNED NOT NULL DEFAULT 10,
    passing_score       TINYINT UNSIGNED COMMENT 'For quizzes/assessments (0-100)',
    is_locked           BOOLEAN NOT NULL DEFAULT TRUE,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order          SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE SET NULL,
    UNIQUE KEY uq_course_day (course_id, day_number)
);

-- ============================================================
-- 7. ENROLLMENTS TABLE
-- ============================================================
CREATE TABLE enrollments (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    course_id           BIGINT UNSIGNED NOT NULL,
    payment_id          BIGINT UNSIGNED COMMENT 'FK to payments',
    enrolled_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    started_at          DATETIME,
    completed_at        DATETIME,
    expiry_date         DATE COMMENT 'Access expiry',
    status              ENUM('active', 'completed', 'expired', 'refunded', 'suspended') NOT NULL DEFAULT 'active',
    progress_percent    DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    tasks_completed     SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    tasks_total         SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    current_day         SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    last_accessed_at    DATETIME,
    mentor_id           BIGINT UNSIGNED COMMENT 'Assigned mentor',
    certificate_issued  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_course (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================================
-- 8. SUBMISSIONS TABLE
-- ============================================================
CREATE TABLE submissions (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    enrollment_id       BIGINT UNSIGNED NOT NULL,
    user_id             BIGINT UNSIGNED NOT NULL,
    task_id             BIGINT UNSIGNED NOT NULL,
    submission_type     ENUM('file_upload', 'github_link', 'external_url', 'text') NOT NULL,
    file_url            VARCHAR(500),
    file_name           VARCHAR(255),
    file_size_bytes     BIGINT UNSIGNED,
    external_url        VARCHAR(500),
    text_content        TEXT,
    notes               TEXT COMMENT 'Student notes to mentor',
    status              ENUM('pending', 'under_review', 'approved', 'rejected', 'resubmit_required') NOT NULL DEFAULT 'pending',
    attempt_number      TINYINT UNSIGNED NOT NULL DEFAULT 1,
    score               TINYINT UNSIGNED COMMENT '0-100',
    reviewed_by         BIGINT UNSIGNED COMMENT 'Mentor user ID',
    reviewed_at         DATETIME,
    feedback            TEXT,
    feedback_file_url   VARCHAR(500),
    submitted_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_task (user_id, task_id),
    INDEX idx_status (status)
);

-- ============================================================
-- 9. MENTOR_ASSIGNMENTS TABLE
-- ============================================================
CREATE TABLE mentor_assignments (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    mentor_id       BIGINT UNSIGNED NOT NULL,
    student_id      BIGINT UNSIGNED NOT NULL,
    course_id       BIGINT UNSIGNED NOT NULL,
    assigned_by     BIGINT UNSIGNED NOT NULL COMMENT 'Admin who assigned',
    assigned_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    unassigned_at   DATETIME,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    notes           TEXT,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_mentor_student_course (mentor_id, student_id, course_id),
    FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id)
);

-- ============================================================
-- 10. LIVE_SESSIONS TABLE  (Webinar / Live Video)
-- ============================================================
CREATE TABLE live_sessions (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid                VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
    course_id           BIGINT UNSIGNED,
    module_id           BIGINT UNSIGNED,
    mentor_id           BIGINT UNSIGNED NOT NULL,
    created_by          BIGINT UNSIGNED NOT NULL COMMENT 'Admin/Mentor who scheduled',
    title               VARCHAR(255) NOT NULL,
    description         TEXT,
    session_type        ENUM('live_class', 'q_and_a', 'workshop', 'demo', 'orientation', 'doubt_clearing') NOT NULL DEFAULT 'live_class',
    platform            ENUM('zoom', 'google_meet', 'webrtc', 'youtube_live', 'custom') NOT NULL DEFAULT 'zoom',
    start_time          DATETIME NOT NULL,
    duration_minutes    SMALLINT UNSIGNED NOT NULL DEFAULT 60,
    end_time            DATETIME GENERATED ALWAYS AS (DATE_ADD(start_time, INTERVAL duration_minutes MINUTE)) STORED,
    timezone            VARCHAR(60) NOT NULL DEFAULT 'Asia/Kolkata',
    max_participants    SMALLINT UNSIGNED,
    thumbnail_url       VARCHAR(500),
    -- Zoom fields
    zoom_meeting_id     VARCHAR(100),
    join_url            VARCHAR(1000),
    start_url           VARCHAR(1000),
    zoom_password       VARCHAR(50),
    -- WebRTC fields
    session_token       VARCHAR(255),
    signaling_url       VARCHAR(500),
    room_id             VARCHAR(100),
    -- Recording
    is_recorded         BOOLEAN NOT NULL DEFAULT FALSE,
    recording_url       VARCHAR(500),
    recording_path      VARCHAR(500),
    recording_size_mb   DECIMAL(10,2),
    recording_status    ENUM('not_recorded', 'processing', 'available', 'failed') NOT NULL DEFAULT 'not_recorded',
    -- Status & metadata
    status              ENUM('scheduled', 'live', 'completed', 'cancelled', 'postponed') NOT NULL DEFAULT 'scheduled',
    actual_start_time   DATETIME,
    actual_end_time     DATETIME,
    participant_count   SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    is_public           BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Visible to non-enrolled users',
    reminder_sent_24h   BOOLEAN NOT NULL DEFAULT FALSE,
    reminder_sent_1h    BOOLEAN NOT NULL DEFAULT FALSE,
    tags                VARCHAR(500),
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    cancelled_at        DATETIME,
    cancellation_reason TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
    FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE SET NULL,
    FOREIGN KEY (mentor_id) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_start_time (start_time),
    INDEX idx_status (status),
    INDEX idx_course_sessions (course_id, start_time)
);

-- ============================================================
-- 11. LIVE_SESSION_ATTENDEES TABLE
-- ============================================================
CREATE TABLE live_session_attendees (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_id      BIGINT UNSIGNED NOT NULL,
    user_id         BIGINT UNSIGNED NOT NULL,
    joined_at       DATETIME,
    left_at         DATETIME,
    duration_secs   INT UNSIGNED COMMENT 'Time actually in session',
    is_registered   BOOLEAN NOT NULL DEFAULT TRUE,
    attended        BOOLEAN NOT NULL DEFAULT FALSE,
    ip_address      VARCHAR(45),
    device_type     ENUM('desktop', 'mobile', 'tablet') DEFAULT 'desktop',
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_session_user (session_id, user_id),
    FOREIGN KEY (session_id) REFERENCES live_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 12. HOME_PAGE_CONTENT TABLE  (Dynamic homepage CMS)
-- ============================================================
CREATE TABLE home_page_content (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    section_key     VARCHAR(100) NOT NULL UNIQUE COMMENT 'e.g. hero_heading, hero_subtext, stats_students',
    section_name    VARCHAR(150) NOT NULL COMMENT 'Human-readable label',
    content_type    ENUM('text', 'html', 'image_url', 'video_url', 'json', 'number', 'boolean') NOT NULL DEFAULT 'text',
    content_value   TEXT NOT NULL,
    language        ENUM('english', 'tamil', 'hindi') NOT NULL DEFAULT 'english',
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order      SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    last_edited_by  BIGINT UNSIGNED,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (last_edited_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_section_lang (section_key, language)
);

-- ============================================================
-- 13. HOME_PAGE_BANNERS TABLE
-- ============================================================
CREATE TABLE home_page_banners (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(255),
    subtitle        VARCHAR(500),
    cta_text        VARCHAR(100),
    cta_url         VARCHAR(500),
    image_url       VARCHAR(500) NOT NULL,
    mobile_image_url VARCHAR(500),
    banner_type     ENUM('hero', 'announcement', 'promotion', 'webinar') NOT NULL DEFAULT 'hero',
    position        ENUM('top', 'middle', 'bottom', 'popup') NOT NULL DEFAULT 'top',
    target_audience ENUM('all', 'student', 'mentor', 'guest') NOT NULL DEFAULT 'all',
    start_date      DATETIME,
    end_date        DATETIME,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order      SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    click_count     INT UNSIGNED NOT NULL DEFAULT 0,
    created_by      BIGINT UNSIGNED,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================================
-- 14. TESTIMONIALS TABLE
-- ============================================================
CREATE TABLE testimonials (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED COMMENT 'NULL = external testimonial',
    name            VARCHAR(150) NOT NULL,
    designation     VARCHAR(200),
    company         VARCHAR(200),
    course_id       BIGINT UNSIGNED,
    rating          TINYINT UNSIGNED NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    testimonial     TEXT NOT NULL,
    photo_url       VARCHAR(500),
    video_url       VARCHAR(500),
    is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order      SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);

-- ============================================================
-- 15. PAYMENTS TABLE
-- ============================================================
CREATE TABLE payments (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid                VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
    user_id             BIGINT UNSIGNED NOT NULL,
    course_id           BIGINT UNSIGNED NOT NULL,
    amount              DECIMAL(10,2) NOT NULL,
    currency            VARCHAR(5) NOT NULL DEFAULT 'INR',
    discount_amount     DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    coupon_code         VARCHAR(50),
    final_amount        DECIMAL(10,2) NOT NULL,
    payment_gateway     ENUM('razorpay', 'stripe', 'paytm', 'upi', 'manual', 'free') NOT NULL DEFAULT 'razorpay',
    gateway_order_id    VARCHAR(255),
    gateway_payment_id  VARCHAR(255),
    gateway_signature   VARCHAR(500),
    payment_method      ENUM('card', 'upi', 'netbanking', 'wallet', 'emi', 'free', 'manual') DEFAULT 'card',
    status              ENUM('pending', 'processing', 'success', 'failed', 'refunded', 'partially_refunded') NOT NULL DEFAULT 'pending',
    paid_at             DATETIME,
    refund_amount       DECIMAL(10,2),
    refunded_at         DATETIME,
    refund_reason       TEXT,
    invoice_url         VARCHAR(500),
    notes               TEXT,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    INDEX idx_user_payments (user_id),
    INDEX idx_status (status)
);

-- Add FK from enrollments to payments (after payments table exists)
ALTER TABLE enrollments ADD CONSTRAINT fk_enrollment_payment
    FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL;

-- ============================================================
-- 16. COUPONS TABLE
-- ============================================================
CREATE TABLE coupons (
    id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code                VARCHAR(50) NOT NULL UNIQUE,
    description         VARCHAR(500),
    discount_type       ENUM('percentage', 'flat') NOT NULL DEFAULT 'percentage',
    discount_value      DECIMAL(10,2) NOT NULL,
    max_discount_amount DECIMAL(10,2) COMMENT 'Cap for percentage coupons',
    min_order_amount    DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    course_ids          TEXT COMMENT 'JSON array; NULL = all courses',
    usage_limit         INT UNSIGNED COMMENT 'Total uses allowed; NULL = unlimited',
    used_count          INT UNSIGNED NOT NULL DEFAULT 0,
    per_user_limit      TINYINT UNSIGNED NOT NULL DEFAULT 1,
    valid_from          DATETIME NOT NULL,
    valid_until         DATETIME NOT NULL,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_by          BIGINT UNSIGNED,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================================
-- 17. CERTIFICATES TABLE
-- ============================================================
CREATE TABLE certificates (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    certificate_number  VARCHAR(100) NOT NULL UNIQUE,
    user_id             BIGINT UNSIGNED NOT NULL,
    enrollment_id       BIGINT UNSIGNED NOT NULL,
    course_id           BIGINT UNSIGNED NOT NULL,
    issued_at           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiry_date         DATE,
    certificate_url     VARCHAR(500),
    pdf_url             VARCHAR(500),
    verification_url    VARCHAR(500),
    verification_code   VARCHAR(50) NOT NULL UNIQUE,
    is_valid            BOOLEAN NOT NULL DEFAULT TRUE,
    revoked_at          DATETIME,
    revoke_reason       TEXT,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- ============================================================
-- 18. NOTIFICATIONS TABLE
-- ============================================================
CREATE TABLE notifications (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    type            ENUM(
                        'task_unlocked', 'submission_pending', 'submission_approved',
                        'submission_rejected', 'new_session', 'session_reminder',
                        'session_started', 'session_cancelled', 'payment_success',
                        'payment_failed', 'certificate_issued', 'course_enrolled',
                        'announcement', 'system'
                    ) NOT NULL,
    title           VARCHAR(255) NOT NULL,
    message         TEXT NOT NULL,
    action_url      VARCHAR(500),
    icon_type       VARCHAR(50),
    channel         ENUM('in_app', 'email', 'sms', 'push', 'whatsapp') NOT NULL DEFAULT 'in_app',
    is_read         BOOLEAN NOT NULL DEFAULT FALSE,
    read_at         DATETIME,
    sent_at         DATETIME,
    reference_id    BIGINT UNSIGNED COMMENT 'ID of related resource',
    reference_type  VARCHAR(50) COMMENT 'submissions, sessions, tasks, etc.',
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_unread (user_id, is_read),
    INDEX idx_created (created_at)
);

-- ===========================================================
-- 19. COURSE_REVIEWS TABLE
-- ============================================================
CREATE TABLE course_reviews (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_id   BIGINT UNSIGNED NOT NULL,
    user_id     BIGINT UNSIGNED NOT NULL,
    rating      TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review      TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Verified purchaser',
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    helpful_count INT UNSIGNED NOT NULL DEFAULT 0,
    approved_by BIGINT UNSIGNED,
    approved_at DATETIME,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_course (user_id, course_id),
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================================
-- 20. AUDIT_LOGS TABLE
-- ============================================================
CREATE TABLE audit_logs (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED,
    action          VARCHAR(100) NOT NULL COMMENT 'CREATE_COURSE, APPROVE_SUBMISSION, etc.',
    resource_type   VARCHAR(50) NOT NULL,
    resource_id     BIGINT UNSIGNED,
    old_values      JSON,
    new_values      JSON,
    ip_address      VARCHAR(45),
    user_agent      VARCHAR(500),
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_action (user_id, action),
    INDEX idx_resource (resource_type, resource_id)
);

-- ============================================================
-- 21. PLATFORM_SETTINGS TABLE  (Global config / feature flags)
-- ============================================================
CREATE TABLE platform_settings (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(150) NOT NULL UNIQUE,
    value       TEXT NOT NULL,
    data_type   ENUM('string', 'integer', 'boolean', 'json', 'html') NOT NULL DEFAULT 'string',
    description TEXT,
    is_public   BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Exposed to frontend',
    group_name  VARCHAR(100) COMMENT 'Grouping: general, payment, email, seo, etc.',
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- 22. FAQ TABLE
-- ============================================================
CREATE TABLE faqs (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    question    TEXT NOT NULL,
    answer      TEXT NOT NULL,
    category    VARCHAR(100) COMMENT 'general, payment, technical, course',
    course_id   BIGINT UNSIGNED COMMENT 'Course-specific FAQ; NULL = global',
    sort_order  SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);

-- ============================================================
-- SEED: Home Page Content rows
-- ============================================================
INSERT INTO home_page_content (section_key, section_name, content_type, content_value, language) VALUES
('hero_heading',        'Hero Main Heading',        'text',     'Learn AI & Cybersecurity in Tamil',            'english'),
('hero_subheading',     'Hero Sub Heading',         'text',     'Structured 30–45 day programs with mentor validation', 'english'),
('hero_cta_primary',    'Hero Primary Button Text', 'text',     'Start Learning',                               'english'),
('hero_cta_secondary',  'Hero Secondary Button',    'text',     'View Courses',                                 'english'),
('hero_image_url',      'Hero Banner Image',        'image_url','https://cdn.bynixx.in/hero-banner.jpg',        'english'),
('stats_students',      'Total Students Stat',      'number',   '0',                                            'english'),
('stats_courses',       'Total Courses Stat',       'number',   '0',                                            'english'),
('stats_mentors',       'Total Mentors Stat',       'number',   '0',                                            'english'),
('stats_completion_rate','Completion Rate %',       'number',   '85',                                           'english'),
('about_section',       'About Section Text',       'html',     '<p>Bynixx bridges the gap between academics and industry skills.</p>', 'english'),
('footer_tagline',      'Footer Tagline',           'text',     'Learn. Build. Get Placed.',                    'english'),
('contact_email',       'Contact Email',            'text',     'support@bynixx.in',                            'english'),
('contact_phone',       'Contact Phone',            'text',     '+91 75300 08380',                              'english');

-- ============================================================
-- SEED: Platform Settings
-- ============================================================
INSERT INTO platform_settings (setting_key, value, data_type, description, is_public, group_name) VALUES
('site_name',           'Bynixx',       'string',   'Platform name',                    TRUE,  'general'),
('site_tagline',        'Learn. Build. Get Placed.', 'string', 'Tagline', TRUE, 'general'),
('maintenance_mode',    'false',        'boolean',  'Enable maintenance mode',           FALSE, 'general'),
('razorpay_enabled',    'true',         'boolean',  'Enable Razorpay payments',          FALSE, 'payment'),
('zoom_enabled',        'true',         'boolean',  'Enable Zoom integration',           FALSE, 'sessions'),
('webrtc_enabled',      'false',        'boolean',  'Enable custom WebRTC sessions',     FALSE, 'sessions'),
('max_submission_size_mb','10',         'integer',  'Max file size for submissions',      TRUE,  'uploads'),
('certificate_template','default',      'string',   'Certificate design template',       FALSE, 'certificates'),
('support_email',       'support@bynixx.in','string','Support email address',            TRUE,  'general');
