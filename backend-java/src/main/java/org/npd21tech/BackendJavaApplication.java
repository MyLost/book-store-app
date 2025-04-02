package org.npd21tech;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendJavaApplication implements CommandLineRunner {

    public static void main(String[] args) {
		SpringApplication.run(BackendJavaApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

	}
}
