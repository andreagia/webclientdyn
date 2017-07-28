package org.cirmmp.webclientdyn.elfinder.controller.executors;

import org.cirmmp.webclientdyn.elfinder.controller.ErrorException;
import org.cirmmp.webclientdyn.elfinder.controller.executor.AbstractJsonCommandExecutor;
import org.cirmmp.webclientdyn.elfinder.controller.executor.CommandExecutor;
import org.cirmmp.webclientdyn.elfinder.service.FsService;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

/**
 * This is a command that should be executed when a matching command can't be
 * found.
 */
public class MissingCommandExecutor extends AbstractJsonCommandExecutor
		implements CommandExecutor
{
	@Override
	protected void execute(FsService fsService, HttpServletRequest request,
                           ServletContext servletContext, JSONObject json) throws Exception
	{
		String cmd = request.getParameter("cmd");
		throw new ErrorException("errUnknownCmd", cmd);
	}
}
