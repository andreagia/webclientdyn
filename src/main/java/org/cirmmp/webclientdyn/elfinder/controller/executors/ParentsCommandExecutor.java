package org.cirmmp.webclientdyn.elfinder.controller.executors;

import org.cirmmp.webclientdyn.elfinder.controller.ErrorException;
import org.cirmmp.webclientdyn.elfinder.controller.executor.AbstractJsonCommandExecutor;
import org.cirmmp.webclientdyn.elfinder.controller.executor.CommandExecutor;
import org.cirmmp.webclientdyn.elfinder.controller.executor.FsItemEx;
import org.cirmmp.webclientdyn.elfinder.service.FsService;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

public class ParentsCommandExecutor extends AbstractJsonCommandExecutor
		implements CommandExecutor
{
	// This is a limit on the number of parents so that a badly implemented
	// FsService can't
	// result in a runaway thread.
	final static int LIMIT = 1024;

	@Override
	public void execute(FsService fsService, HttpServletRequest request,
                        ServletContext servletContext, JSONObject json) throws Exception
	{
		String target = request.getParameter("target");

		Map<String, FsItemEx> files = new HashMap<String, FsItemEx>();
		FsItemEx fsi = findItem(fsService, target);
		for (int i = 0; !fsi.isRoot(); i++)
		{
			super.addSubfolders(files, fsi);
			fsi = fsi.getParent();
			if (i > LIMIT)
			{
				throw new ErrorException(
						"Reached recursion limit on parents of: " + LIMIT);
			}
		}

		json.put("tree", files2JsonArray(request, files.values()));
	}
}
