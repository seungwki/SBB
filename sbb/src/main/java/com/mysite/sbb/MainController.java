package com.mysite.sbb;

import com.mysite.sbb.answer.AnswerRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

	private final AnswerRepository answerRepository;

	MainController(AnswerRepository answerRepository) {
		this.answerRepository = answerRepository;
	}

	@GetMapping("/sbb")
	@ResponseBody
	public String index() {
		return "안녕하새요. SBB에 오신 것을 환영합니다.";
	}

	@GetMapping("/")
	public String root() {
		return "redirect:/question/list";
	}
}
