package serialization;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author DASI Team
 */
public abstract class Serialization {

    public abstract void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException;

}
