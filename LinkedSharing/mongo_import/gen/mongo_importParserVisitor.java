// Generated from /home/ze/IdeaProjects/mongo_import/src/mongo_importParser.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link mongo_importParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface mongo_importParserVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link mongo_importParser#user}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUser(mongo_importParser.UserContext ctx);
	/**
	 * Visit a parse tree produced by {@link mongo_importParser#exp}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExp(mongo_importParser.ExpContext ctx);
}