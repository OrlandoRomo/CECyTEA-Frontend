export interface Question {
    _id: String;
    questionDescription: String;
    options: String[];
    correctOption: String;
    category: Object[];
}
