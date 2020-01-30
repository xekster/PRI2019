// Generated from /home/ze/IdeaProjects/mongo_import/src/mongo_importParser.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link mongo_importParser}.
 */
public interface mongo_importParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link mongo_importParser#user}.
	 * @param ctx the parse tree
	 */
	void enterUser(mongo_importParser.UserContext ctx);
	/**
	 * Exit a parse tree produced by {@link mongo_importParser#user}.
	 * @param ctx the parse tree
	 */
	void exitUser(mongo_importParser.UserContext ctx);
	/**
	 * Enter a parse tree produced by {@link mongo_importParser#exp}.
	 * @param ctx the parse tree
	 */
	void enterExp(mongo_importParser.ExpContext ctx);
	/**
	 * Exit a parse tree produced by {@link mongo_importParser#exp}.
	 * @param ctx the parse tree
	 */
	void exitExp(mongo_importParser.ExpContext ctx);
}