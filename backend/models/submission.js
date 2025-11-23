const mongoose = require("mongoose");
const Submission = require("./Submission");
const sinon = require("sinon");

describe("Submission model", () => {
  let SubmissionModel;

  beforeAll(() => {
    SubmissionModel = mongoose.model("Submission", Submission.SubmissionSchema);
  });

  it("should require quizId, answers, and score fields", () => {
    const submission = new SubmissionModel();

    const validationError = submission.validateSync();

    expect(validationError.errors.quizId).toBeDefined();
    expect(validationError.errors.answers).toBeDefined();
    expect(validationError.errors.score).toBeDefined();
  });

  it("should require answers to be a non-empty array on save", async () => {
    const submission = new SubmissionModel({ quizId: mongoose.Types.ObjectId(), answers: "", score: 0 });

    try {
      await submission.save();
    } catch (error) {
      expect(error.message).toBe("Answers must be a non-empty array");
    }
  });

  it("should calculate score based on correct answers", async () => {
    const submission = new SubmissionModel({ quizId: mongoose.Types.ObjectId(), answers: ["correct", "incorrect", "correct"], score: 0 });

    const saveSpy = sinon.spy(submission, "save");
    await submission.save();

    expect(submission.score).toBe(2);
    expect(saveSpy.calledOnce).toBe(true);

    saveSpy.restore();
  });
});