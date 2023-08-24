import dotenv from "dotenv";

dotenv.config();

export const RegisterConfig = {
	headers: {
		ContentType: "application / json",
		"Access-Control-Allow-Origin": "*"
	}
};
