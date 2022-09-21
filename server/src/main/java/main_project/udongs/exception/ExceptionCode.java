package main_project.udongs.exception;

import lombok.Getter;

public enum ExceptionCode {

        UNAUTHORIZED(404, "Unauthorized"),
        MEMBER_NOT_FOUND(404, "Member not found"),
        QUESTION_NOT_FOUND(404, "Question not found"),
        ANSWER_NOT_FOUND(404, "Answer not found"),
        TAG_NOT_FOUND(404, "tag not found"),
        STUDY_NOT_FOUND(404, "Study not found"),
        STUDY_EXISTS(409, "Study already exists"),
        MEMBER_EXISTS(409, "Member exists"),
        EMAIL_EXISTS(409, "Email already exists"),
        TAG_EXISTS(409, "Tag exists"),
        NOT_IMPLEMENTATION(501, "Not Implementation"),
        INVALID_MEMBER_STATUS(400, "Invalid member status");

        @Getter
        private int status;

        @Getter
        private String message;

        ExceptionCode(int code, String message) {
            this.status = code;
            this.message = message;
        }
}
