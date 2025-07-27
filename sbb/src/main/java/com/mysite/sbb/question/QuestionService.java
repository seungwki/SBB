package com.mysite.sbb.question;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mysite.sbb.DataNotFoundException;
import com.mysite.sbb.MainController;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {

//    private final MainController mainController;
	private final QuestionRepository questionRepository;

//    QuestionService(MainController mainController) {
//        this.mainController = mainController;
//    }
	public List<Question> getList(){
		return this.questionRepository.findAll();
	}
	public Question getQuestion(Integer id) {
		Optional<Question> question = this.questionRepository.findById(id);
		if(question.isPresent()) {
			return question.get();
		}else {
			throw new DataNotFoundException("question fot found");
		}
	}
}