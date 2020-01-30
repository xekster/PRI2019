import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class mongo_importVisitor extends mongo_importParserBaseVisitor{



    @Override
    public String visitUser(mongo_importParser.UserContext ctx) {
        int error = 0;
        if(ctx.exp().size() != 6)
            error++;
        for (mongo_importParser.ExpContext exp : ctx.exp()){
            if(visitExp(exp).get(0).equals("Input Invalido"))
                error++;
        }

        if (error == 0) {
            // Creating a Mongo client
            MongoClient mongo = new MongoClient("localhost", 27017);
            List<String> nova = new ArrayList<>();
            Document doc = new Document();
            for(int p = 0; p < 6; p++){
                if(visitExp(ctx.exp(p)).get(0).equals("password")) {
                    doc.append(visitExp(ctx.exp(p)).get(0), BCrypt.hashpw(visitExp(ctx.exp(p)).get(1), BCrypt.gensalt(10)));
                }
                else{
                    doc.append(visitExp(ctx.exp(p)).get(0), visitExp(ctx.exp(p)).get(1));
                }
            }
            doc.append("amigos", Arrays.asList());

            // Accessing the database
            MongoDatabase database = mongo.getDatabase("LinkedSharing");
            MongoCollection<Document> col = database.getCollection("users");
            col.insertOne(doc);
        }
        return "Terminado com sucesso";
    }

    @Override
    public List<String> visitExp(mongo_importParser.ExpContext ctx) {
        List<String> nova = new ArrayList<>();
        if((ctx.TUDO(0).toString().equals("email")||ctx.TUDO(0).toString().equals("password")||ctx.TUDO(0).toString().equals("nome")||ctx.TUDO(0).toString().equals("universidade")||ctx.TUDO(0).toString().equals("ano")||ctx.TUDO(0).toString().equals("curso")) && !ctx.TUDO(1).toString().startsWith("<")){
            nova.add(ctx.TUDO(0).toString());
            nova.add(ctx.TUDO(1).toString());
        }else{
            nova.add("Input Invalido");
        }
        return nova;
    }
}

