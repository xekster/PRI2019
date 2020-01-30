import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.ParserRuleContext;

import java.io.FileWriter;
import java.io.IOException;

import com.mongodb.client.MongoDatabase;
import com.mongodb.MongoCredential;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class Main {
    public static void main(String[] args) {
        mongo_importLexer lexer;
        try {
            lexer = new mongo_importLexer(CharStreams.fromFileName(args[0]));
            CommonTokenStream tokens = new CommonTokenStream(lexer);
            mongo_importParser parser = new mongo_importParser(tokens);
            ParserRuleContext ctx = parser.user();

            mongo_importVisitor visitor = new mongo_importVisitor();
            String a = visitor.visitUser((mongo_importParser.UserContext) ctx);
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}
